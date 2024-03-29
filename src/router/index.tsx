import React, { Suspense } from "react"
import { useLocation, useRoutes } from "react-router-dom"
import type { Location } from "react-router-dom"
import { CSSTransition, SwitchTransition } from "react-transition-group"
import type { CSSTransitionClassNames } from "react-transition-group/CSSTransition"

import Loading from "~/components/common/Loading"

import routes from "./routes"
import transition from "./transition.module.scss"

/**
 * @description 路由组件
 * @return {*}  {React.ReactElement}
 */
function RouterView(): React.ReactElement {
  const router: React.ReactElement = useRoutes(routes)
  const location: Location = useLocation()

  // 过渡动画类名
  const classNames: CSSTransitionClassNames = {
    enter: location.pathname === "/" ? transition.enter_left : transition.enter_right,
    enterActive: location.pathname === "/" ? transition.exit_active_left : transition.exit_active_right,
    exit: location.pathname === "/" ? transition.exit_left : transition.exit_right,
    exitActive: location.pathname === "/" ? transition.exit_active_left : transition.exit_active_right,
  }

  return (
    <SwitchTransition mode="in-out">
      <CSSTransition
        key={location.key}
        timeout={100}
        classNames={classNames}
        unmountOnExit
      >
        <Suspense fallback={<Loading />}>{router}</Suspense>
      </CSSTransition>
    </SwitchTransition>
  )
}

export default RouterView
