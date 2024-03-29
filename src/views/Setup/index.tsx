import React from "react"
import { useSelector } from "react-redux"

import SetupContent from "~/Layout/Contents/SetupContent"
import { SetupHeader } from "~/Layout/Headers"
import { NoticeRow, ResetRow, StorageRow, ThemeRow } from "~/Layout/Rows"
import Version from "~/components/Version"
import Page from "~/components/common/Page"

/**
 * @description 设置页组件
 * @return {*}  {React.ReactElement}
 */
function Setup(): React.ReactElement {
  // 状态
  const darkMode: boolean = useSelector((state: State): boolean => state.theme.darkMode)

  return (
    <Page darkMode={darkMode}>
      <SetupHeader darkMode={darkMode} />
      <SetupContent darkMode={darkMode}>
        <NoticeRow darkMode={darkMode} />
        <ThemeRow darkMode={darkMode} />
        <StorageRow darkMode={darkMode} />
        <ResetRow darkMode={darkMode} />
        <Version />
      </SetupContent>
    </Page>
  )
}

export default Setup
