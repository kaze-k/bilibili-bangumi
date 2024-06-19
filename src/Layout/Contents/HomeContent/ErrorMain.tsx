import type React from "react"

import ErrorPage from "~/components/ErrorPage"
import { Main } from "~/components/base"

import style from "./style.module.scss"

/**
 * @description 错误内容组件
 * @return {*}  {React.ReactElement}
 */
function ErrorMain(): React.ReactElement {
  return (
    <Main className={style["main"]}>
      <div className={style["wrapper"]}>
        <ErrorPage text="加载失败" />
      </div>
    </Main>
  )
}

export default ErrorMain
