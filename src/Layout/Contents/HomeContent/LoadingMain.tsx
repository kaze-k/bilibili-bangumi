import type React from "react"

import Loading from "~/components/Loading"
import { Main } from "~/components/base"

import style from "./style.module.scss"

/**
 * @description 加载内容组件
 * @return {*}  {React.ReactElement}
 */
function LoadingMain(): React.ReactElement {
  return (
    <Main className={style["main"]}>
      <div className={style["wrapper"]}>
        <Loading icon="loading" />
      </div>
    </Main>
  )
}

export default LoadingMain
