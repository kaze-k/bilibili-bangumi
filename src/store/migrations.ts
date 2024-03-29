const migrations = {
  0: (state: AppState): ReturnType<typeof migrations> => ({
    ...state,
    episodeStyle: undefined,
    storage: undefined,
    episode: { type: "all" },
    notice: { ...state.notice, notice: undefined, toggle: false },
  }),
}

export default migrations
