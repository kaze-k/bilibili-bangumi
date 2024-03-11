import { useEffect, useState } from "react"

/**
 * @description 消息操作
 * @enum {number}
 */
enum ActionType {
  UPSERT_MESSAGE,
  ADD_MESSAGE,
  REMOVE_MESSAGE,
  CLEAR_MESSAGE,
  UPDATE_MESSAGE,
}

// 消息操作类型
type Action =
  | {
      type: ActionType.UPSERT_MESSAGE
      payload: MessageState
    }
  | {
      type: ActionType.ADD_MESSAGE
      payload: MessageState
    }
  | {
      type: ActionType.REMOVE_MESSAGE
      id: string
    }
  | {
      type: ActionType.CLEAR_MESSAGE
    }
  | {
      type: ActionType.UPDATE_MESSAGE
      id: string
      payload: MessagePayload
    }

// 消息状态队列
let memoryState: MessageState[] = []

// 消息监听队列
const listeners: Array<(state: MessageState[]) => void> = []

// 默认消息持续时间
const defaultTimeouts: Record<MessageType, number> = {
  success: 3000,
  info: 3000,
  warning: 3000,
  error: 3000,
  default: 3000,
  loading: Infinity,
}

/**
 * @description 消息状态队列处理方法
 * @param {MessageState[]} state 消息状态队列
 * @param {Action} action 消息操作
 * @return {*}  {MessageState[]} 新的消息状态队列
 */
const reducer: (state: MessageState[], action: Action) => MessageState[] = (
  state: MessageState[],
  action: Action,
): MessageState[] => {
  switch (action.type) {
    case ActionType.UPSERT_MESSAGE:
      return state.find((m: MessageState): boolean => m.id === action.payload.id)
        ? reducer(state, { type: ActionType.UPDATE_MESSAGE, id: action.payload.id, payload: action.payload })
        : reducer(state, { type: ActionType.ADD_MESSAGE, payload: action.payload })

    case ActionType.ADD_MESSAGE:
      return [...state, action.payload]

    case ActionType.REMOVE_MESSAGE:
      return state.filter((m: MessageState): boolean => m.id !== action.id)

    case ActionType.CLEAR_MESSAGE:
      return []

    case ActionType.UPDATE_MESSAGE:
      return state.map((m: MessageState): MessageState => (m.id === action.id ? { ...m, ...action.payload } : m))

    default:
      return state
  }
}

/**
 * @description 提交消息操作方法
 * @param {Action} action 消息操作
 */
const dispatch: (action: Action) => void = (action: Action): void => {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener: (state: MessageState[]) => void): void => listener(memoryState))
}

/**
 * @description 获取消息状态队列hook
 * @param {StoreOptions} [storeOptions={}] 消息选项
 * @param {number} storeOptions.duration 消息持续时间
 * @return {*}  {MessageState[]} 消息状态队列
 */
const useStore: (storeOptions?: StoreOptions) => MessageState[] = (storeOptions: StoreOptions = {}): MessageState[] => {
  // 状态
  const [state, setState] = useState<MessageState[]>(memoryState)

  // 当消息状态队列变化时: 设置消息监听队列
  useEffect((): (() => void) => {
    listeners.push(setState)

    return (): void => {
      const index: number = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  // 合并消息状态队列
  const mergedState: MessageState[] = state.map(
    (m: MessageState): MessageState => ({
      ...m,
      ...storeOptions,
      duration:
        m.duration ||
        (m.type === "loading" && defaultTimeouts.loading) ||
        storeOptions.duration ||
        defaultTimeouts[m.type],
    }),
  )

  return mergedState
}

export { ActionType, dispatch, useStore }
