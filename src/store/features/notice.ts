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

const notice: Slice<NoticeState, NoticeReducers, "notice"> = createSlice({
  name: "notice",
  initialState: {
    notice: false,
    autoClear: false,
  },
  reducers: {
    /**
     * @description 切换通知开关
     * @param {NoticeState} state 状态
     */
    toggleNotice(state: NoticeState): void {
      state.notice = !state.notice
    },

    /**
     * @description 重置通知开关
     * @param {NoticeState} state 状态
     */
    resetNotice(state: NoticeState): void {
      state.notice = false
    },
  },
})

const { toggleNotice, resetNotice } = notice.actions

export { toggleNotice, resetNotice, enableNotice, disableNotice }

export default notice.reducer
