import type { PayloadAction } from "@reduxjs/toolkit"
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { createLogger } from "redux-logger"
import { persistReducer, persistStore } from "redux-persist"
import { syncStorage } from "redux-persist-webextension-storage"
import type { PersistPartial } from "redux-persist/lib/persistReducer"

import { PersistKey } from "./enums"
import data from "./features/data"
import episode, { episodeInitialState } from "./features/episode"
import notice, { noticeInitialState } from "./features/notice"
import theme, { themeInitialState } from "./features/theme"
import type { DataState, EpisodeState, NoticeState, ThemeState } from "./types"

const DEBUG: boolean = process.env.NODE_ENV === "development"

const episodePersistConfig = {
  key: PersistKey.EPISODE,
  keyPrefix: PersistKey.PREFIX,
  storage: syncStorage,
  serialize: true,
  version: 0,
  debug: DEBUG,
  blacklist: [],
}

const noticePersistConfig = {
  key: PersistKey.NOTICE,
  keyPrefix: PersistKey.PREFIX,
  storage: syncStorage,
  serialize: true,
  version: 0,
  debug: DEBUG,
  blacklist: [],
}

const themePersistConfig = {
  key: PersistKey.THEME,
  keyPrefix: PersistKey.PREFIX,
  storage: syncStorage,
  serialize: true,
  version: 0,
  debug: DEBUG,
  blacklist: [],
}

interface RootState {
  data: DataState
  episode: EpisodeState & PersistPartial
  notice: NoticeState & PersistPartial
  theme: ThemeState & PersistPartial
}

const logger = createLogger()

const combineReducer = combineReducers({
  data: data,
  episode: persistReducer(episodePersistConfig, episode),
  notice: persistReducer(noticePersistConfig, notice),
  theme: persistReducer(themePersistConfig, theme),
})

const reducer: (state: RootState, action: PayloadAction<RootState>) => RootState = (
  state: RootState,
  action: PayloadAction<RootState>,
): RootState => {
  if (action.type === "SET_STATES") return action.payload
  if (action.type === "RESET_STATES") {
    const resetState = {
      episode: { ...state.episode, ...episodeInitialState() },
      notice: { ...state.notice, ...noticeInitialState() },
      theme: { ...state.theme, ...themeInitialState() },
    }
    return combineReducer({ ...state, ...resetState }, action)
  }
  return combineReducer(state, action)
}

const store = configureStore({
  reducer: reducer,
  devTools: DEBUG,
  middleware: (getDefaultMiddleware) =>
    DEBUG
      ? getDefaultMiddleware({
          serializableCheck: false,
        }).concat(logger)
      : getDefaultMiddleware({
          serializableCheck: false,
        }),
})

const persistor = persistStore(store)

type AppState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export { store, persistor }

export type { AppState, AppDispatch }
