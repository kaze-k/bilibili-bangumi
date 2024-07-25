import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import type React from "react"

import { Main } from "~/components/base"

import style from "./style.module.scss"

/**
 * @description 等待内容组件
 * @return {*}  {React.ReactElement}
 */
function WaitMain(): React.ReactElement {
  return (
    <Main className={style["main"]}>
      <div className={style["wrapper"]}>
        <FontAwesomeIcon
          icon={["fab", "bilibili"]}
          size="2xl"
          className={style["icon"]}
        />
      </div>
    </Main>
  )
}

export default WaitMain
