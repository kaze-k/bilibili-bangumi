const migrations = {
  0: (state: AppState): ReturnType<typeof migrations> => ({
    ...state,
    episodeStyle: { ...state.episodeStyle, episodeStyle: undefined, style: "all" },
    notice: { ...state.notice, notice: undefined, toggle: false },
  }),
}

export default migrations
