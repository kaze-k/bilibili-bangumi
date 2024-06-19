import { lazy } from "react"
import type React from "react"
import type { RouteObject } from "react-router-dom"

const ChangelogContent: React.LazyExoticComponent<() => React.ReactElement> = lazy(
  (): Promise<typeof import("Contents/Changelog")> => import("Contents/Changelog"),
)

// 路由配置
const routes: RouteObject[] = [
  {
    id: "changelog",
    path: "/",
    Component: ChangelogContent,
  },
]

export default routes
