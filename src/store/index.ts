import { combineReducers, configureStore } from "@reduxjs/toolkit"
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  createMigrate,
  persistReducer,
  persistStore,
} from "redux-persist"
import { syncStorage } from "redux-persist-webextension-storage"

import data from "./features/data"
import episode from "./features/episode"
import notice from "./features/notice"
import storage from "./features/storage"
import theme from "./features/theme"
import migrations from "./migrations"

const DEBUG: boolean = process.env.NODE_ENV === "development"

const combinedReducers: CombinedReducers = combineReducers({
  theme,
  notice,
  episode,
  storage,
  data,
})

const storageConfig = {
  key: "syncStorage",
  storage: syncStorage,
  version: 0,
  migrate: createMigrate(migrations, { debug: DEBUG }),
  debug: DEBUG,
  blacklist: ["data", "storage"],
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
