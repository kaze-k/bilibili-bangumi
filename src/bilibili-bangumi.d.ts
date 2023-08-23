declare module "*.module.scss" {
  const content: Record<string, string>
  export default content
}

declare module "*.jpg" {
  const content: string
  export default content
}

declare module "*.png" {
  const content: string
  export default content
}

declare module "archive-webpack-plugin" {
  interface Options {
    source: string
    destination: string
    format: "zip" | "tar"
  }
  class ArchiveWebapckPlugin {
    constructor(options: Options | void)

    apply(compiler: import("webpack").Compiler): void
  }
  export default ArchiveWebapckPlugin
}

type ReactElement = React.ReactElement

type StyledComponent<C, T, O, A> = import("styled-components").StyledComponent<C, T, O, A>

type CSSProp = import("styled-components").CSSProp

type RefObject<T> = React.RefObject<T>

type ChangeEvent<T> = React.ChangeEvent<T>

type ChangeEventHandler<T> = React.ChangeEventHandler<T>

type MouseEventHandler<T> = React.MouseEventHandler<T>

type DebouncedFunc<T> = import("lodash").DebouncedFunc<T>

interface DarkModeProps {
  darkMode?: boolean
}

interface StorageChanges {
  [key: string]: chrome.storage.StorageChange
}

type StorageAreaName = "sync" | "local" | "managed" | "session"
