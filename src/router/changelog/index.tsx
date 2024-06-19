import { Suspense } from "react"
import type React from "react"
import { useRoutes } from "react-router-dom"

import { ChangelogHeader } from "~/Layout/Headers"
import Loading from "~/components/Loading"
import { View } from "~/components/base"

import routes from "./routes"

/**
 * @description changelog页面路由组件
 * @return {*}  {React.ReactElement}
 */
function RouterView(): React.ReactElement {
  const router: React.ReactElement = useRoutes(routes)

  return (
    <View>
      <ChangelogHeader />
      <Suspense fallback={<Loading icon="spinner" />}>{router}</Suspense>
    </View>
  )
}

export default RouterView
