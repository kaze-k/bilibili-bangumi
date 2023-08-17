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

declare module "crx3" {
  const crx3: ([]: string[], settings: {
    keyPath: string,
    crxPath: string,
  }) => Promise<void>
  export default crx3
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
