import { createSlice } from "@reduxjs/toolkit"

const episodeStyle: Slice<EpisodeStyleState, EpisodeStyleReducers, "episodeStyle"> = createSlice({
  name: "episodeStyle",
  initialState: {
    style: "all",
    index: 0,
  },
  reducers: {
    /**
     * @description 设置类别
     * @param {EpisodeStyleState} state 状态
     * @param {PayloadAction<string>} actions 设置的类别
     */
    setStyle(state: EpisodeStyleState, actions: PayloadAction<"all" | "anime" | "guochuang">): void {
      state.style = actions.payload

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
     * @description 重置类别
     * @param {EpisodeStyleState} state 状态
     */
    resetStyle(state: EpisodeStyleState): void {
      state.style = "all"
      state.index = 0
    },
  },
})

export const { setStyle, resetStyle } = episodeStyle.actions

export default episodeStyle.reducer
