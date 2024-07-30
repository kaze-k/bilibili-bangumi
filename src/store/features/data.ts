import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit"

import { MessageType } from "~/background/enums"
import type { MessageRequest } from "~/background/types"

/**
 * @description 发送中止请求的通信
 * @return {*}  {Promise<void>}
 */
const abort = createAsyncThunk("data/abort", async (): Promise<boolean> => {
  try {
    const response: boolean = await chrome.runtime.sendMessage<MessageRequest>({ type: MessageType.ABORT })
    return response
  } catch (error: unknown) {
    throw error
  }
})

/**
 * @description 发送更新信息的通信
 * @return {*}  {Promise<boolean>} 返回更新状态
 */
const update = createAsyncThunk("data/update", async (): Promise<boolean> => {
  try {
    const response: boolean = await chrome.runtime.sendMessage<MessageRequest>({ type: MessageType.UPDATE })
    return response
  } catch (error: unknown) {
    throw error
  }
})

/**
 * @description 发送获取日期信息的通信
 * @return {*}  {Promise<[][]>} 返回从background获取的日漫日期信息
 */
const getDates = createAsyncThunk("data/getDates", async (): Promise<[][]> => {
  try {
    const response: { data: [][] } = await chrome.runtime.sendMessage<MessageRequest>({ type: MessageType.DATES })
    return response.data
  } catch (error: unknown) {
    throw error
  }
})

/**
 * @description 发送获取全部剧集信息的通信
 * @return {*}  {Promise<[][]>} 返回从background获取的全部剧集信息
 */
const getAllEpisodes = createAsyncThunk("data/getAllEpisodes", async (): Promise<[][]> => {
  try {
    const response: { data: [][] } = await chrome.runtime.sendMessage<MessageRequest>({
      type: MessageType.GET_ALL_EPISODES,
    })
    return response.data
  } catch (error: unknown) {
    throw error
  }
})

/**
 * @description 发送获取日漫剧集信息的通信
 * @return {*}  {Promise<[][]>} 返回从background获取的日漫剧集信息
 */
const getAnimeEpisodes = createAsyncThunk("data/getAnimeEpisodes", async (): Promise<[][]> => {
  try {
    const response: { data: [][] } = await chrome.runtime.sendMessage<MessageRequest>({
      type: MessageType.GET_ANIME_EPISODES,
    })
    return response.data
  } catch (error: unknown) {
    throw error
  }
})

/**
 * @description 发送获取国创剧集信息的通信
 * @return {*}  {Promise<[][]>} 返回从background获取的国创剧集信息
 */
const getGuoChuangEpisodes = createAsyncThunk("data/getGuoChuangEpisodes", async (): Promise<[][]> => {
  try {
    const response: { data: [][] } = await chrome.runtime.sendMessage<MessageRequest>({
      type: MessageType.GET_GUOCHUANG_EPISODES,
    })
    return response.data
  } catch (error: unknown) {
    throw error
  }
})

export interface DataState {
  episodes: [][]
  dates: [][]
  todayEpisodes: []
  checked: boolean[]
  currentIndex: number
  isLoading: boolean
  isError: boolean
}

const initialState: DataState = {
  episodes: [],
  dates: [],
  todayEpisodes: null,
  checked: [],
  currentIndex: null,
  isLoading: null,
  isError: null,
}

const data = createSlice({
  name: "data",
  initialState: initialState,
  reducers: {
    /**
     * @description 设置当前的页面索引
     * @param {DataState} state 状态
     * @param {PayloadAction<number>} actions 设置当前页面的索引值
     */
    setIndex: (state: DataState, actions: PayloadAction<number>): void => {
      state.currentIndex = actions.payload
    },

    /**
     * @description 设置导航栏选项数组
     * @param {DataState} state 状态
     * @param {PayloadAction<number>} actions 设置导航栏选中的值
     */
    setChecked: (state: DataState, actions: PayloadAction<number>): void => {
      const checked: boolean[] = [...state.checked].fill(false)
      checked[actions.payload] = true
      state.checked = checked
    },

    /**
     * @description 重置状态
     * @param {DataState} state 状态
     */
    resetState: (state: DataState): void => {
      state.currentIndex = null
      state.isLoading = null
      state.isError = null
    },

    /**
     * @description 恢复初始状态
     * @param {DataState} state 状态
     */
    clearData: (state: DataState): void => {
      Object.keys(initialState).forEach((key: string): void => {
        state[key] = initialState[key]
      })
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<DataState>): void => {
    builder
      // 更新信息的通信的异步处理
      .addCase(update.pending, (state: DataState): void => {
        state.isLoading = true
      })
      .addCase(update.fulfilled, (state: DataState, actions: PayloadAction<boolean>): void => {
        state.isError = !actions.payload
        state.isLoading = false
      })
      .addCase(update.rejected, (state: DataState): void => {
        state.isError = true
        state.isLoading = false
      })

      // 获取日期信息的通信的异步处理
      .addCase(getDates.fulfilled, (state: DataState, actions: PayloadAction<[][]>): void => {
        if (actions.payload === null) state.isError = true
        if (actions.payload) state.dates = actions.payload
      })

      // 获取全部剧集信息的通信的异步处理
      .addCase(getAllEpisodes.fulfilled, (state: DataState, actions: PayloadAction<[][]>): void => {
        if (actions.payload === null) state.isError = true
        if (actions.payload) state.episodes = actions.payload

        if (actions.payload && actions.payload.length) {
          state.todayEpisodes = actions.payload.find(
            (episodes: object[]): boolean => episodes === actions.payload[Math.floor(actions.payload.length / 2)],
          )
        }

        if (state.currentIndex === null && actions.payload && actions.payload.length) {
          state.currentIndex = Math.floor(actions.payload.length / 2)
        }
      })

      // 获取动漫剧集信息的通信的异步处理
      .addCase(getAnimeEpisodes.fulfilled, (state: DataState, actions: PayloadAction<[][]>): void => {
        if (actions.payload === null) state.isError = true
        if (actions.payload) state.episodes = actions.payload

        if (actions.payload && actions.payload.length) {
          state.todayEpisodes = actions.payload.find(
            (episodes: object[]): boolean => episodes === actions.payload[Math.floor(actions.payload.length / 2)],
          )
        }

        if (state.currentIndex === null && actions.payload && actions.payload.length) {
          state.currentIndex = Math.floor(actions.payload.length / 2)
        }
      })

      // 获取国创剧集信息的通信的异步处理
      .addCase(getGuoChuangEpisodes.fulfilled, (state: DataState, actions: PayloadAction<[][]>): void => {
        if (actions.payload === null) state.isError = true
        if (actions.payload) state.episodes = actions.payload

        if (actions.payload && actions.payload.length) {
          state.todayEpisodes = actions.payload.find(
            (episodes: object[]): boolean => episodes === actions.payload[Math.floor(actions.payload.length / 2)],
          )
        }

        if (state.currentIndex === null && actions.payload && actions.payload.length) {
          state.currentIndex = Math.floor(actions.payload.length / 2)
        }
      })
  },
})

export const { setIndex, setChecked, resetState, clearData } = data.actions

export { abort, update, getDates, getAllEpisodes, getAnimeEpisodes, getGuoChuangEpisodes }

export const dataInitialState: () => DataState = data.getInitialState

export default data.reducer
