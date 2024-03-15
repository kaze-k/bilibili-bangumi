import { createSlice } from "@reduxjs/toolkit"

const storage: Slice<StorageState, StorageReducers, "storage"> = createSlice({
  name: "storage",
  initialState: {
    storage: true,
    change: false,
  },
  reducers: {
    /**
     * @description 开启存储
     * @param {StorageState} state 状态
     */
    enableStorage(state: StorageState): void {
      state.storage = true
    },

    /**
     * @description 关闭通知
     * @param {StorageState} state 状态
     */
    disableStorage(state: StorageState): void {
      state.storage = false
    },

    /**
     * @description 存储内容是否改变
     * @param {StorageState} state
     */
    toggleChange(state: StorageState): void {
      state.change = !state.change
    },
  },
})

export const { enableStorage, disableStorage, toggleChange } = storage.actions

export const storageInitialState: () => StorageState = storage.getInitialState

export default storage.reducer
