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

interface Json {
  [key: string]: any
}

interface DarkModeProps {
  darkMode?: boolean
}

type StorageChanges = {
  [key: string]: chrome.storage.StorageChange
}

type StorageAreaName = "sync" | "local" | "managed" | "session"
