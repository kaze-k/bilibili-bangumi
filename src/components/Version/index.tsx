import React from "react"

import style from "./style.module.scss"

const version: string = chrome.runtime.getManifest().version
/**
 * @description 当前版本号组件
 * @return {*}  {React.ReactElement}
 */
function Version(): React.ReactElement {
  return <strong className={style.version}>{`v${version}`}</strong>
}

export default Version
