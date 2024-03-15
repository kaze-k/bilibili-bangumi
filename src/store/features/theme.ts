import { createSlice } from "@reduxjs/toolkit"

const theme: Slice<ThemeState, ThemeReducers, "theme"> = createSlice({
  name: "theme",
  initialState: {
    darkMode: false,
    system: false,
    auto: false,
    am: 7,
    pm: 19,
  },
  reducers: {
    /**
     * @description 切换深色主题
     * @param {ThemeState} state 状态
     */
    toggleDarkMode(state: ThemeState): void {
      state.darkMode = !state.darkMode
      state.system = false
      state.auto = false
    },

    /**
     * @description 切换跟随系统的主题
     * @param {ThemeState} state 状态
     */
    toggleSysTheme(state: ThemeState): void {
      state.system = !state.system
      state.auto = false

      if (state.system) {
        const dark: boolean = window.matchMedia("(prefers-color-scheme: dark)").matches
        dark ? (state.darkMode = true) : (state.darkMode = false)
      }
    },

    /**
     * @description 切换自动更换主题
     * @param {ThemeState} state 状态
     */
    toggleAutoTheme(state: ThemeState): void {
      state.auto = !state.auto

      const time: number = new Date().getHours()
      if (state.am <= time && time < state.pm) {
        state.darkMode = false
      } else {
        state.darkMode = true
      }
    },

    /**
     * @description 设置深色模式
     * @param {ThemeState} state 状态
     * @param {PayloadAction<boolean>} actions 设置深色模式的状态
     */
    setDarkMode(state: ThemeState, actions: PayloadAction<boolean>): void {
      state.darkMode = actions.payload
    },

    /**
     * @description 更新自动更换主题的状态
     * @param {ThemeState} state 状态
     */
    updateAutoTheme(state: ThemeState): void {
      if (state.auto) {
        const time: number = new Date().getHours()
        if (state.am <= time && time < state.pm) {
          state.darkMode = false
        } else {
          state.darkMode = true
        }
      }

      if (state.system) {
        const dark: boolean = window.matchMedia("(prefers-color-scheme: dark)").matches
        dark ? (state.darkMode = true) : (state.darkMode = false)
      }
    },

    /**
     * @description 重置主题
     * @param {ThemeState} state 状态
     */
    resetTheme(state: ThemeState): void {
      state.darkMode = false
      state.system = false
      state.auto = false
      state.am = 7
      state.pm = 19
    },
  },
})

export const { toggleDarkMode, toggleSysTheme, toggleAutoTheme, setDarkMode, updateAutoTheme, resetTheme } =
  theme.actions

export const themeInitialState: () => ThemeState = theme.getInitialState

export default theme.reducer
