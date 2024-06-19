import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

import { MessageType } from "~/background/enums"
import type { MessageRequest } from "~/background/types"

export interface NoticeState {
  toggle: boolean
  silent: boolean
  autoClear: boolean
  animeNotice: boolean
  guochuangNotice: boolean
  timeout: number
}

const initialState: NoticeState = {
  toggle: false,
  silent: false,
  autoClear: false,
  animeNotice: false,
  guochuangNotice: false,
  timeout: 5 * 60 * 1000,
}

const notice = createSlice({
  name: "notice",
  initialState: initialState,
  reducers: {
    /**
     * @description 设置通知开关
     * @param {NoticeState} state 状态
     * @param {PayloadAction<boolean>} actions 设置通知的状态
     */
    setNotice: (state: NoticeState, actions: PayloadAction<boolean>): void => {
      state.toggle = actions.payload
      state.animeNotice = state.toggle
      state.guochuangNotice = state.toggle

      if (state.toggle) {
        chrome.runtime.sendMessage<MessageRequest>({ type: MessageType.ENABLE_NOTICES })
      } else {
        chrome.runtime.sendMessage<MessageRequest>({ type: MessageType.DISABLE_NOTICES })
      }
    },

    /**
     * @description 设置静默通知开关
     * @param {NoticeState} state 状态
     * @param {PayloadAction<boolean>} actions 设置静默通知的状态
     */
    setSilent: (state: NoticeState, actions: PayloadAction<boolean>): void => {
      state.silent = actions.payload
    },

    /**
     * @description 设置自动清除通知开关
     * @param {NoticeState} state 状态
     * @param {PayloadAction<boolean>} actions 设置自动清除通知的状态
     */
    setAutoClear: (state: NoticeState, actions: PayloadAction<boolean>): void => {
      state.autoClear = actions.payload
    },

    /**
     * @description 设置番剧通知开关
     * @param {NoticeState} state 状态
     * @param {PayloadAction<boolean>} actions 设置番剧通知的状态
     */
    setAnimeNotice: (state: NoticeState, actions: PayloadAction<boolean>): void => {
      state.animeNotice = actions.payload

      if (state.animeNotice) {
        chrome.runtime.sendMessage<MessageRequest>({ type: MessageType.ENABLE_ANIME_NOTICE })
      } else {
        chrome.runtime.sendMessage<MessageRequest>({ type: MessageType.DISABLE_ANIME_NOTICE })
      }
    },

    /**
     * @description 设置国创通知开关
     * @param {NoticeState} state 状态
     * @param {PayloadAction<boolean>} actions 设置国创通知的状态
     */
    setGuoChuangNotice: (state: NoticeState, actions: PayloadAction<boolean>): void => {
      state.guochuangNotice = actions.payload

      if (state.guochuangNotice) {
        chrome.runtime.sendMessage<MessageRequest>({ type: MessageType.ENABLE_GUOCHUANG_NOTICE })
      } else {
        chrome.runtime.sendMessage<MessageRequest>({ type: MessageType.DISABLE_GUOCHUANG_NOTICE })
      }
    },

    /**
     * @description 重置通知开关
     * @param {NoticeState} state 状态
     */
    resetNotice: (state: NoticeState): void => {
      Object.keys(initialState).forEach((key: string): void => {
        state[key] = initialState[key]
      })
    },
  },
})

export const { setNotice, setSilent, setAutoClear, setAnimeNotice, setGuoChuangNotice, resetNotice } = notice.actions

export const noticeInitialState: () => NoticeState = notice.getInitialState

export default notice.reducer
