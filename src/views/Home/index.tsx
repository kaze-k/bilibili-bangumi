import type React from "react"

import { HomeContent } from "~/Layout/Contents"
import { HomeHeader } from "~/Layout/Headers"
import SelectBar from "~/components/SelectBar"
import { useFetchData, useOnlineStatus } from "~/hooks"

/**
 * @description 首页组件
 * @return {*}  {React.ReactElement}
 */
function Home(): React.ReactElement {
  useFetchData()
  useOnlineStatus()

  return (
    <>
      <HomeHeader />
      <HomeContent />
      <SelectBar />
    </>
  )
}

export default Home
