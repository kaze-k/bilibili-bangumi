import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

import { EpisodeType } from "../enums"

export interface EpisodeState {
  type: EpisodeType
  todayType: EpisodeType
}

const initialState: EpisodeState = {
  type: EpisodeType.ALL,
  todayType: EpisodeType.ALL,
}

const episode = createSlice({
  name: "episode",
  initialState: initialState,
  reducers: {
    /**
     * @description 设置类型
     * @param {EpisodeState} state 状态
     * @param {PayloadAction<string>} actions 设置的类型
     */
    setType: (state: EpisodeState, actions: PayloadAction<EpisodeType>): void => {
      state.type = actions.payload
    },

    /**
     * @description 设置今日类型
     * @param {EpisodeState} state 状态
     * @param {PayloadAction<EpisodeType>} actions 设置今日类型
     */
    setTodayType: (state: EpisodeState, actions: PayloadAction<EpisodeType>): void => {
      state.todayType = actions.payload
    },

    /**
     * @description 重置类型
     * @param {EpisodeState} state 状态
     */
    resetType: (state: EpisodeState): void => {
      Object.keys(initialState).forEach((key: string): void => {
        state[key] = initialState[key]
      })
    },
  },
})

export const { setType, setTodayType, resetType } = episode.actions

export const episodeInitialState: () => EpisodeState = episode.getInitialState

export default episode.reducer
