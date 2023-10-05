import style from "./style.module.scss"

/**
 * @description 当前版本号组件
 * @return {*}  {React.ReactElement}
 */
function Version(): React.ReactElement {
  const version: string = chrome.runtime.getManifest().version

  return <strong className={style.version}>{`v${version}`}</strong>
}

export default Version
