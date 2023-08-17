import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from "redux-persist"
import { syncStorage } from "redux-persist-webextension-storage"

import data from "./features/data"
import episodeStyle from "./features/episodeStyle"
import notice from "./features/notice"
import storage from "./features/storage"
import theme from "./features/theme"

const combinedReducers: CombinedReducers = combineReducers({
  theme,
  notice,
  episodeStyle,
  storage,
  data,
})

const storageConfig = {
  key: "syncStorage",
  storage: syncStorage,
  blacklist: ["data"],
}

const persistedReducer: PersistedReducer = persistReducer(storageConfig, combinedReducers)

const store: Store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware: GetDefaultMiddleware): Middleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

const persistor = persistStore(store)

export { store, persistor }
