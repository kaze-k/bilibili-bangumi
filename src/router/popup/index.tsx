import { Suspense, createRef } from "react"
import type React from "react"
import { useLocation, useRoutes } from "react-router-dom"
import type { Location, RouteObject } from "react-router-dom"
import { CSSTransition, TransitionGroup } from "react-transition-group"
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
  const baseTransition: CSSTransitionClassNames = {}

  if (location.pathname !== "/") {
    baseTransition.enter = transition["cover-enter"]
    baseTransition.enterActive = transition["cover-enter-active"]
    baseTransition.exit = transition["cover-exit"]
    baseTransition.exitActive = transition["cover-exit-active"]
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
    <TransitionGroup component={null}>
      <CSSTransition
        key={location.key}
        timeout={400}
        classNames={classNames}
        nodeRef={nodeRef}
        unmountOnExit
      >
        <View ref={nodeRef}>
          <Suspense fallback={<Loading icon="spinner" />}>{router}</Suspense>
        </View>
      </CSSTransition>
    </TransitionGroup>
  )
}

export default RouterView
