import React from "react"

import Main from "~/components/common/Main"

import style from "./style.module.scss"

/**
 * @description 设置页面内容组件
 * @param {SetupContentProps} props 设置页面内容组件Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @param {React.ReactNode} props.children 子组件
 * @return {*}  {React.ReactElement}
 */
function SetupContent(props: SetupContentProps): React.ReactElement {
  return (
    <Main
      className={style.main}
      darkMode={props.darkMode}
    >
      <div className={style.wrapper}>{props.children}</div>
    </Main>
  )
}

export default SetupContent
