type Dispatch = typeof import("~/store").store.dispatch

type State = ReturnType<typeof import("~/store").store.getState>

type PayloadAction<P> = import("@reduxjs/toolkit").PayloadAction<P>

type Reducer<S, A> = import("@reduxjs/toolkit").Reducer<S, A>

type CombinedState<S> = import("@reduxjs/toolkit").CombinedState<S>

type EmptyObject = import("@reduxjs/toolkit").EmptyObject

type AnyAction = import("@reduxjs/toolkit").AnyAction

type ToolkitStore<S, A, M> = import("@reduxjs/toolkit/dist/configureStore").ToolkitStore<S, A, M>

type ThunkMiddleware<S, B> = import("@reduxjs/toolkit").ThunkMiddleware<S, B>

type PersistPartial = import("redux-persist/es/persistReducer").PersistPartial

type CurriedGetDefaultMiddleware<S> =
  import("@reduxjs/toolkit/dist/getDefaultMiddleware").CurriedGetDefaultMiddleware<S>

type AsyncThunk<Returned, ThunkArg, ThunkApiConfig> = import("@reduxjs/toolkit").AsyncThunk<
  Returned,
  ThunkArg,
  ThunkApiConfig
>

type Slice<State, CaseReducers, Name> = import("@reduxjs/toolkit").Slice<State, CaseReducers, Name>

type ActionReducerMapBuilder<State> = import("@reduxjs/toolkit").ActionReducerMapBuilder<State>

interface DataState {
  episodes: Array<[]>
  dates: Array<[]>
  currentIndex: number
  checked: boolean[]
  anime_episodes: Array<[]>
  anime_dates: Array<[]>
  guochuang_episodes: Array<[]>
  guochuang_dates: Array<[]>
}

type EpisodeStyleState = {
  episodeStyle?: "all" | "anime" | "guochuang"
  index?: number
}

type NoticeState = {
  notice: boolean
  autoClear: boolean
}

type StorageState = {
  storage: boolean
  change: boolean
}

type ThemeState = {
  darkMode: boolean
  system: boolean
  auto: boolean
  am: number
  pm: number
}

type AppState = {
  theme: ThemeState
  notice: NoticeState
  episodeStyle: EpisodeStyleState
  storage: StorageState
  data: DataState
}

type DataReducers = {
  setIndex(state: DataState, actions: PayloadAction<number>): void
  setChecked(state: DataState, actions: PayloadAction<number>): void
  clearData(state: DataState): void
}

type EpisodeStyleReducers = {
  setStyle(state: EpisodeStyleState, actions: PayloadAction<string>): void
  resetStyle(state: EpisodeStyleState): void
}

type NoticeReducers = {
  toggleNotice(state: NoticeState): void
  resetNotice(state: NoticeState): void
}

type StorageReducers = {
  enableStorage(state: StorageState): void
  disableStorage(state: StorageState): void
  toggleChange(state: StorageState): void
}

type ThemeReducers = {
  toggleDarkMode(state: ThemeState): void
  toggleSysTheme(state: ThemeState): void
  toggleAutoTheme(state: ThemeState): void
  updateAutoTheme(state: ThemeState): void
  resetTheme(state: ThemeState): void
}

interface MessageResponse {
  data: any
}

type CombinedReducers = Reducer<CombinedState<AppState>, AnyAction>

type PersistedReducer = Reducer<EmptyObject & AppState & PersistPartial, AnyAction>

type Middleware = import("@reduxjs/toolkit").MiddlewareArray<
  [ThunkMiddleware<EmptyObject & AppState & PersistPartial, AnyAction>]
>

type Store = ToolkitStore<EmptyObject & AppState & PersistPartial, AnyAction, Middleware>

type GetDefaultMiddleware = CurriedGetDefaultMiddleware<EmptyObject & AppState & PersistPartial>
