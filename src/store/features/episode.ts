import { createSlice } from "@reduxjs/toolkit"

const episode: Slice<EpisodeState, EpisodeReducers, "episode"> = createSlice({
  name: "episode",
  initialState: {
    type: "all",
    index: 0,
  },
  reducers: {
    /**
     * @description 设置类型
     * @param {EpisodeState} state 状态
     * @param {PayloadAction<string>} actions 设置的类型
     */
    setType(state: EpisodeState, actions: PayloadAction<"all" | "anime" | "guochuang">): void {
      state.type = actions.payload

      switch (actions.payload) {
        case "all":
          state.index = 0
          break

        case "anime":
          state.index = 1
          break

        case "guochuang":
          state.index = 2
          break
      }
    },

    /**
     * @description 重置类型
     * @param {EpisodeState} state 状态
     */
    resetType(state: EpisodeState): void {
      state.type = "all"
      state.index = 0
    },
  },
})

export const { setType, resetType } = episode.actions

export const episodeInitialState: () => EpisodeState = episode.getInitialState

export default episode.reducer
