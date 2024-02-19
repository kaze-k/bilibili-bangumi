import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

/**
 * @description 发送更新信息的通信
 * @return {*}  {Promise<boolean | null>} 返回布尔值
 */
const update: AsyncThunk<boolean | null, void, void> = createAsyncThunk(
  "data/update",
  async (): Promise<boolean | null> => {
    const response: boolean | null = await chrome.runtime.sendMessage({ message: "update" })
    return response
  },
)

/**
 * @description 发送获取全部剧集信息的通信
 * @return {*}  {Promise<[][]>} 返回从background获取的全部剧集信息
 */
const getAllEpisodes: AsyncThunk<[][], void, void> = createAsyncThunk("data/all/episodes", async (): Promise<[][]> => {
  const response: MessageResponse = await chrome.runtime.sendMessage({ message: "all_episodes" })
  return response.data
})

/**
 * @description 发送获取日漫日期信息的通信
 * @return {*}  {Promise<[][]>} 返回从background获取的日漫日期信息
 */
const getAnimeDates: AsyncThunk<[][], void, void> = createAsyncThunk("data/anime/dates", async (): Promise<[][]> => {
  const response: MessageResponse = await chrome.runtime.sendMessage({ message: "anime_dates" })
  return response.data
})

/**
 * @description 发送获取日漫剧集信息的通信
 * @return {*}  {Promise<[][]>} 返回从background获取的日漫剧集信息
 */
const getAnimeEpisodes: AsyncThunk<[][], void, void> = createAsyncThunk(
  "data/anime/episodes",
  async (): Promise<[][]> => {
    const response: MessageResponse = await chrome.runtime.sendMessage({ message: "anime_episodes" })
    return response.data
  },
)

/**
 * @description 发送获取国创日期信息的通信
 * @return {*}  {Promise<[][]>} 返回从background获取的国创日期信息
 */
const getGuoChuangDates: AsyncThunk<[][], void, void> = createAsyncThunk(
  "data/guochuang/dates",
  async (): Promise<[][]> => {
    const response: MessageResponse = await chrome.runtime.sendMessage({ message: "guochuang_dates" })
    return response.data
  },
)

/**
 * @description 发送获取国创剧集信息的通信
 * @return {*}  {Promise<[][]>} 返回从background获取的国创剧集信息
 */
const getGuoChuangEpisodes: AsyncThunk<[][], void, void> = createAsyncThunk(
  "data/guochuang/episodes",
  async (): Promise<[][]> => {
    const response: MessageResponse = await chrome.runtime.sendMessage({ message: "guochuang_episodes" })
    return response.data
  },
)

const data: Slice<DataState, DataReducers, "data"> = createSlice({
  name: "data",
  initialState: {
    episodes: [],
    dates: [],
    currentIndex: null,
    checked: [],
    anime_episodes: [],
    anime_dates: [],
    guochuang_episodes: [],
    guochuang_dates: [],
    isLoading: false,
    isError: false,
  },
  reducers: {
    /**
     * @description 设置当前的页面索引
     * @param {DataState} state 状态
     * @param {PayloadAction<number>} actions 设置当前页面的索引值
     */
    setIndex(state: DataState, actions: PayloadAction<number>): void {
      state.currentIndex = actions.payload
    },

    /**
     * @description 设置导航栏选项数组
     * @param {DataState} state 状态
     * @param {PayloadAction<number>} actions 设置导航栏选中的值
     */
    setChecked(state: DataState, actions: PayloadAction<number>): void {
      const checked: boolean[] = [...state.checked].fill(false)
      checked[actions.payload] = true
      state.checked = checked
    },

    /**
     * @description 恢复初始状态
     * @param {DataState} state 状态
     */
    clearData(state: DataState): void {
      state.episodes = []
      state.dates = []
      state.currentIndex = null
      state.checked = []
      state.anime_episodes = []
      state.anime_dates = []
      state.guochuang_episodes = []
      state.guochuang_dates = []
      state.isLoading = false
      state.isError = false
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<DataState>): void => {
    builder
      .addCase(update.pending, (state: DataState): void => {
        state.isError = false
        state.isLoading = true
      })
      .addCase(update.fulfilled, (state: DataState, actions: PayloadAction<boolean>): void => {
        state.isError = !actions.payload
        if (!state.isError) {
          state.isLoading = !actions.payload
        } else {
          state.isLoading = false
        }
      })

      .addCase(getAllEpisodes.fulfilled, (state: DataState, actions: PayloadAction<[][]>): void => {
        state.episodes = actions.payload
      })

      .addCase(getAnimeDates.fulfilled, (state: DataState, actions: PayloadAction<[][]>): void => {
        state.anime_dates = actions.payload
        state.dates = actions.payload
      })

      .addCase(getAnimeEpisodes.fulfilled, (state: DataState, actions: PayloadAction<[][]>): void => {
        state.anime_episodes = actions.payload
        state.episodes = actions.payload
      })

      .addCase(getGuoChuangDates.fulfilled, (state: DataState, actions: PayloadAction<[][]>): void => {
        state.guochuang_dates = actions.payload
        state.dates = actions.payload
      })

      .addCase(getGuoChuangEpisodes.fulfilled, (state: DataState, actions: PayloadAction<[][]>): void => {
        state.guochuang_episodes = actions.payload
        state.episodes = actions.payload
      })
  },
})

const { setIndex, setChecked, clearData } = data.actions

export {
  setIndex,
  setChecked,
  clearData,
  update,
  getAllEpisodes,
  getAnimeDates,
  getAnimeEpisodes,
  getGuoChuangDates,
  getGuoChuangEpisodes,
}

export default data.reducer
