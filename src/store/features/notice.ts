import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

/**
 * @description 发送开启通知的通信
 * @return {*}  {Promise<void>} 无返回值
 */
const enableNotice: AsyncThunk<void, void, void> = createAsyncThunk("notice/enable", async (): Promise<void> => {
  await chrome.runtime.sendMessage({ message: "enable_notice" })
})

/**
 * @description 发送关闭通知的通信
 * @return {*}  {Promise<void>} 无返回值
 */
const disableNotice: AsyncThunk<void, void, void> = createAsyncThunk("notice/disable", async (): Promise<void> => {
  await chrome.runtime.sendMessage({ message: "disable_notice" })
})

/**
 * @description 发送开启番剧通知的通信
 * @return {*}  {Promise<void>} 无返回值
 */
const enableAnimeNotice: AsyncThunk<void, void, void> = createAsyncThunk(
  "notice/anime/enable",
  async (): Promise<void> => {
    await chrome.runtime.sendMessage({ message: "enable_anime_notice" })
  },
)

/**
 * @description 发送关闭番剧通知的通信
 * @return {*}  {Promise<void>} 无返回值
 */
const disableAnimeNotice: AsyncThunk<void, void, void> = createAsyncThunk(
  "notice/anime/disable",
  async (): Promise<void> => {
    await chrome.runtime.sendMessage({ message: "disable_anime_notice" })
  },
)

/**
 * @description 发送开启国创通知的通信
 * @return {*}  {Promise<void>} 无返回值
 */
const enableGuoChuangNotice: AsyncThunk<void, void, void> = createAsyncThunk(
  "notice/guochuang/enable",
  async (): Promise<void> => {
    await chrome.runtime.sendMessage({ message: "enable_guochuang_notice" })
  },
)

/**
 * @description 发送关闭国创通知的通信
 * @return {*}  {Promise<void>} 无返回值
 */
const disableGuoChuangNotice: AsyncThunk<void, void, void> = createAsyncThunk(
  "notice/guochuang/disable",
  async (): Promise<void> => {
    await chrome.runtime.sendMessage({ message: "disable_guochuang_notice" })
  },
)

const notice: Slice<NoticeState, NoticeReducers, "notice"> = createSlice({
  name: "notice",
  initialState: {
    toggle: false,
    silent: false,
    autoClear: false,
    animeNotice: false,
    guochuangNotice: false,
    timeout: 5 * 60 * 1000,
  },
  reducers: {
    /**
     * @description 切换通知开关
     * @param {NoticeState} state 状态
     */
    toggleNotice(state: NoticeState): void {
      state.toggle = !state.toggle
      state.animeNotice = state.toggle
      state.guochuangNotice = state.toggle
    },

    /**
     * @description 切换静默通知开关
     * @param {NoticeState} state 状态
     */
    toggleSilent(state: NoticeState): void {
      state.silent = !state.silent
    },

    /**
     * @description 切换自动清除通知开关
     * @param {NoticeState} state 状态
     */
    toggleAutoClear(state: NoticeState): void {
      state.autoClear = !state.autoClear
    },

    /**
     * @description 切换番剧通知开关
     * @param {NoticeState} state 状态
     */
    toggleAnimeNotice(state: NoticeState): void {
      state.animeNotice = !state.animeNotice
    },

    /**
     * @description 切换国创通知开关
     * @param {NoticeState} state 状态
     */
    toggleGuoChuangNotice(state: NoticeState): void {
      state.guochuangNotice = !state.guochuangNotice
    },

    /**
     * @description 重置通知开关
     * @param {NoticeState} state 状态
     */
    resetNotice(state: NoticeState): void {
      state.toggle = false
      state.silent = false
      state.autoClear = false
      state.animeNotice = false
      state.guochuangNotice = false
      state.timeout = 5 * 60 * 1000
    },
  },
})

const { toggleNotice, toggleSilent, toggleAutoClear, toggleAnimeNotice, toggleGuoChuangNotice, resetNotice } =
  notice.actions

export {
  toggleNotice,
  toggleSilent,
  toggleAutoClear,
  toggleAnimeNotice,
  toggleGuoChuangNotice,
  resetNotice,
  enableNotice,
  disableNotice,
  enableAnimeNotice,
  disableAnimeNotice,
  enableGuoChuangNotice,
  disableGuoChuangNotice,
}

export const noticeInitialState: () => NoticeState = notice.getInitialState

export default notice.reducer
