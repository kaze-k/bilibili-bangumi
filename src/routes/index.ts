import React, { lazy } from "react"
import { useRoutes } from "react-router-dom"

const Home: LazyElement = lazy((): HomeLazyElement => import("Home"))
const Setup: LazyElement = lazy((): SetupLazyElement => import("Setup"))

/**
 * @description 路由组件
 * @return {*}  {React.ReactElement}
 */
function RouterView(): React.ReactElement {
  const routes: Routes = useRoutes([
    {
      path: "/",
      Component: Home,
    },
    {
      path: "/settings",
      Component: Setup,
    },
  ])

  return routes
}

export default RouterView
