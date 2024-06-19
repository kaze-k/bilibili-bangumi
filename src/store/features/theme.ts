import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface ThemeState {
  darkMode: boolean
  system: boolean
  auto: boolean
  am: number
  pm: number
}

const initialState: ThemeState = {
  darkMode: false,
  system: false,
  auto: false,
  am: 7,
  pm: 19,
}

const theme = createSlice({
  name: "theme",
  initialState: initialState,
  reducers: {
    /**
     * @description 设置深色主题
     * @param {ThemeState} state 状态
     * @param {PayloadAction<boolean>} actions 设置深色模式
     */
    setDarkMode: (state: ThemeState, actions: PayloadAction<boolean>): void => {
      state.darkMode = actions.payload
      state.system = false
      state.auto = false
    },

    /**
     * @description 设置跟随系统的主题
     * @param {ThemeState} state 状态
     * @param {PayloadAction<boolean>} actions 设置跟随系统模式
     */
    setSysTheme: (state: ThemeState, actions: PayloadAction<boolean>): void => {
      state.system = actions.payload
      state.auto = false

      if (state.system) {
        const dark: boolean = window.matchMedia("(prefers-color-scheme: dark)").matches
        dark ? (state.darkMode = true) : (state.darkMode = false)
      }
    },

    /**
     * @description 设置自动更换主题
     * @param {ThemeState} state 状态
     * @param {PayloadAction<boolean>} actions 设置自动更换主题模式
     */
    setAutoTheme: (state: ThemeState, actions: PayloadAction<boolean>): void => {
      state.auto = actions.payload

      const time: number = new Date().getHours()
      if (state.am <= time && time < state.pm) state.darkMode = false
      else state.darkMode = true
    },

    /**
     * @description 更新深色模式的状态
     * @param {ThemeState} state 状态
     * @param {PayloadAction<boolean>} actions 设置深色模式的状态
     */
    updateDarkMode: (state: ThemeState, actions: PayloadAction<boolean>): void => {
      state.darkMode = actions.payload
    },

    /**
     * @description 更新自动更换主题的状态
     * @param {ThemeState} state 状态
     */
    updateAutoTheme: (state: ThemeState): void => {
      if (state.auto) {
        const time: number = new Date().getHours()
        if (state.am <= time && time < state.pm) state.darkMode = false
        else state.darkMode = true
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
    resetTheme: (state: ThemeState): void => {
      Object.keys(initialState).forEach((key: string): void => {
        state[key] = initialState[key]
      })
    },
  },
})

export const { setDarkMode, setSysTheme, setAutoTheme, updateDarkMode, updateAutoTheme, resetTheme } = theme.actions

export const themeInitialState: () => ThemeState = theme.getInitialState

export default theme.reducer
