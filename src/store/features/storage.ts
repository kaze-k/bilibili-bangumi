import { createSlice } from "@reduxjs/toolkit"

const storage: Slice<StorageState, StorageReducers, "storage"> = createSlice({
  name: "storage",
  initialState: {
    toggle: true,
    // change: false,
  },
  reducers: {
    /**
     * @description 开启存储
     * @param {StorageState} state 状态
     */
    enableStorage(state: StorageState): void {
      state.toggle = true
    },

    /**
     * @description 关闭存储
     * @param {StorageState} state 状态
     */
    disableStorage(state: StorageState): void {
      state.toggle = false
    },

    /**
     * @description 存储内容是否改变
     * @param {StorageState} state
     */
    // toggleChange(state: StorageState): void {
    //   state.change = !state.change
    // },
  },
})

export const { enableStorage, disableStorage } = storage.actions

export const storageInitialState: () => StorageState = storage.getInitialState

export default storage.reducer
