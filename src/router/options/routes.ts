import { lazy } from "react"
import type React from "react"
import type { RouteObject } from "react-router-dom"

const SettingContent: React.LazyExoticComponent<() => React.ReactElement> = lazy(
  (): Promise<typeof import("Contents/Setting")> => import("Contents/Setting"),
)

// 路由配置
const routes: RouteObject[] = [
  {
    id: "options",
    path: "/",
    Component: SettingContent,
  },
]

export default routes
