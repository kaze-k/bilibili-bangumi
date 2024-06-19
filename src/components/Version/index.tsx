import { forwardRef, useCallback } from "react"
import type React from "react"

import style from "./style.module.scss"
import type VersionProps from "./types"

// 获取当前插件版本
const VERSION: string = chrome.runtime.getManifest().version

/**
 * @description 当前版本号组件
 * @param {VersionProps} props 当前版本号组件props
 * @param {React.Ref<HTMLDivElement>} ref 当前版本号组件ref
 * @return {*}  {React.ReactElement}
 */
function Version(props: VersionProps, ref: React.Ref<HTMLDivElement>): React.ReactElement {
  const { className } = props

  // 版本号
  const version = `v${VERSION}`

  /**
   * @description 跳转到更新日志
   */
  const handleClick: () => void = useCallback((): void => {
    chrome.tabs.create({ url: "CHANGELOG.html" })
  }, [])

  return (
    <div
      className={`${style["version-wrapper"]} ${className}`}
      onClick={handleClick}
    >
      <strong
        ref={ref}
        className={`${style["version"]}`}
        title={version}
      >
        {version}
      </strong>
    </div>
  )
}

export default forwardRef(Version)
