import { Suspense } from "react"
import type React from "react"
import { useRoutes } from "react-router-dom"

import { ChangelogHeader } from "~/Layout/Headers"
import { View } from "~/components/base"
import Loading from "~/components/base/Loading"

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
      <Suspense
        fallback={
          <Loading
            icon="spinner"
            size="5x"
          />
        }
      >
        {router}
      </Suspense>
    </View>
  )
}

export default RouterView
