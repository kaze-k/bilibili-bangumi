import { AppState } from "."

type RootReducerActions<T> =
  | {
      type: string
    }
  | {
      type: string
      payload: T
    }

/**
 * @description 设置状态
 * @param {Omit<AppState, "data">} newState 新状态
 * @return {*}  {RootReducerActions<Omit<AppState, "data">>}
 */
function setStates(newState: Omit<AppState, "data">): RootReducerActions<Omit<AppState, "data">> {
  return { type: "SET_STATES", payload: newState }
}

/**
 * @description 重置状态
 * @return {*}  {RootReducerActions<void>}
 */
function resetStates(): RootReducerActions<void> {
  return { type: "RESET_STATES" }
}

export { setStates, resetStates }
