import { lazy } from "react"
import type React from "react"
import type { RouteObject } from "react-router-dom"

const Home: React.LazyExoticComponent<() => React.ReactElement> = lazy(
  (): Promise<typeof import("Home")> => import("Home"),
)

const Setup: React.LazyExoticComponent<() => React.ReactElement> = lazy(
  (): Promise<typeof import("Setup")> => import("Setup"),
)

// 路由配置
const routes: RouteObject[] = [
  {
    id: "home",
    path: "/",
    Component: Home,
  },
  {
    id: "setup",
    path: "/setup",
    Component: Setup,
  },
]

export default routes
