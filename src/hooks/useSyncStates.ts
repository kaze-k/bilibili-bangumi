import { isEqual, omit } from "lodash"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { StateType } from "~/background/enums"
import type { MessageRequest, SyncStatePayload } from "~/background/types"
import { store } from "~/store"
import type { AppDispatch, AppState } from "~/store"
import { setStates } from "~/store/rootReducer"
import type { EpisodeState, NoticeState, ThemeState } from "~/store/types"

/**
 * @description 同步状态hook
 * @param {string} source 状态来源
 */
function useSyncStates(source: string): void {
  const dispatch: AppDispatch = useDispatch()

  // 状态
  const episode: EpisodeState = useSelector((state: AppState): EpisodeState => state.episode)
  const notice: NoticeState = useSelector((state: AppState): NoticeState => state.notice)
  const theme: ThemeState = useSelector((state: AppState): ThemeState => state.theme)

  // 当状态改变时: 发送更新状态通信
  useEffect((): (() => void) => {
    const unsubscribe = store.subscribe((): void => {
      const currentState = { episode, notice, theme }
      const state: AppState = store.getState()
      const newState: Omit<AppState, "data"> = omit(state, ["data"])

      if (!isEqual(currentState, newState)) {
        chrome.runtime.sendMessage<MessageRequest<SyncStatePayload>>({
          type: StateType.SYNC_STATES,
          payload: {
            state: newState,
            source: source,
          },
        })
      }
    })

    return (): void => unsubscribe()
  }, [source, episode, notice, theme])

  // 监听更新状态通信
  useEffect((): (() => void) => {
    /**
     * @description 处理消息
     * @param {MessageRequest<SyncStatePayload>} message 消息
     */
    const handleMessage: (message: MessageRequest<SyncStatePayload>) => void = (
      message: MessageRequest<SyncStatePayload>,
    ): void => {
      if (message.type === StateType.UPDATE_STATES && message.payload.source !== source) {
        const state: AppState = store.getState()
        dispatch(setStates({ ...state, ...message.payload.state }))
      }
    }

    chrome.runtime.onMessage.addListener(handleMessage)

    return (): void => chrome.runtime.onMessage.removeListener(handleMessage)
  }, [source, dispatch])
}

export default useSyncStates
