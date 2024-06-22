import { Suspense, createRef } from "react"
import type React from "react"
import { useLocation, useRoutes } from "react-router-dom"
import type { Location, RouteObject } from "react-router-dom"
import { CSSTransition, SwitchTransition } from "react-transition-group"
import type { CSSTransitionClassNames } from "react-transition-group/CSSTransition"

import Loading from "~/components/Loading"
import { View } from "~/components/base"

import routes from "./routes"
import transition from "./transition.module.scss"
import type { RouteWithRefObject } from "./types"

/**
 * @description 将路由对象映射为RouteWithRefObject
 * @param {RouteObject[]} routes 路由对象
 * @return {*}  {RouteWithRefObject<HTMLDivElement>[]}
 */
function mapRoutesWithRef(routes: RouteObject[]): RouteWithRefObject<HTMLDivElement>[] {
  return routes.map(
    (route: RouteObject): RouteWithRefObject<HTMLDivElement> => ({
      ...route,
      nodeRef: createRef<HTMLDivElement>(),
    }),
  )
}

/**
 * @description 获取过渡动画类名
 * @param {Location} location 当前路由
 * @return {*}  {CSSTransitionClassNames} 路由过渡动画类名
 */
function getTransitionClassNames(location: Location): CSSTransitionClassNames {
  const baseTransition: CSSTransitionClassNames = {
    enter: transition["enter-left"],
    enterActive: transition["exit-active-left"],
    exit: transition["exit-left"],
    exitActive: transition["exit-active-left"],
  }

  if (location.pathname !== "/") {
    baseTransition.enter = transition["enter-right"]
    baseTransition.enterActive = transition["exit-active-right"]
    baseTransition.exit = transition["exit-right"]
    baseTransition.exitActive = transition["exit-active-right"]
  }

  return baseTransition
}

/**
 * @description popup页面路由组件
 * @return {*}  {React.ReactElement}
 */
function RouterView(): React.ReactElement {
  const routesWithRef: RouteWithRefObject<HTMLDivElement>[] = mapRoutesWithRef(routes)
  const router: React.ReactElement = useRoutes(routesWithRef)
  const location: Location = useLocation()
  const classNames: CSSTransitionClassNames = getTransitionClassNames(location)

  // 获取对应的ref
  const { nodeRef } = routesWithRef.find(
    (route: RouteWithRefObject<HTMLDivElement>): boolean => route.path === location.pathname,
  )

  return (
    <SwitchTransition mode="in-out">
      <CSSTransition
        key={location.key}
        timeout={300}
        classNames={classNames}
        nodeRef={nodeRef}
        onEntering={(): void => document.body.setAttribute("style", "pointer-events: none;")}
        onEntered={(): void => document.body.removeAttribute("style")}
        onExiting={(): void => document.body.setAttribute("style", "pointer-events: none;")}
        onExited={(): void => document.body.removeAttribute("style")}
        unmountOnExit
      >
        <View ref={nodeRef}>
          <Suspense fallback={<Loading icon="spinner" />}>{router}</Suspense>
        </View>
      </CSSTransition>
    </SwitchTransition>
  )
}

export default RouterView
