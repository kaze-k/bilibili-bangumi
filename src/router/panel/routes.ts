import { lazy } from "react"
import type React from "react"
import type { RouteObject } from "react-router-dom"

const UpdateContent: React.LazyExoticComponent<() => React.ReactElement> = lazy(
  (): Promise<typeof import("Contents/Update")> => import("Contents/Update"),
)

// 路由配置
const routes: RouteObject[] = [
  {
    id: "panel",
    path: "/",
    Component: UpdateContent,
  },
]

export default routes
