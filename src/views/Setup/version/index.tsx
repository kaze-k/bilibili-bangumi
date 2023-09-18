import style from "./style.module.scss"

/**
 * @description 当前版本号组件
 * @return {*}  {ReactElement}
 */
function Version(): ReactElement {
  const version: string = chrome.runtime.getManifest().version

  return <strong className={style.version}>{`v${version}`}</strong>
}

export default Version
