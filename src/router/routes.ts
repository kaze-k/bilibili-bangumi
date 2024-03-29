import React from "react"
import { lazy } from "react"
import type { RouteObject } from "react-router-dom"

const Home: React.LazyExoticComponent<() => React.ReactElement> = lazy(
  (): Promise<typeof import("~/views/Home")> => import("Home"),
)
const Setup: React.LazyExoticComponent<() => React.ReactElement> = lazy(
  (): Promise<typeof import("~/views/Setup")> => import("Setup"),
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
    path: "/settings",
    Component: Setup,
  },
]

export default routes
