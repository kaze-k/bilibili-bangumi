import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { forwardRef, useCallback } from "react"
import type React from "react"

import { RoundButton } from "~/components/base"

// 按钮标题属性
const TITLE = "Github仓库"
// 仓库链接
const URL = "https://github.com/kaze-k/bilibili-bangumi"

/**
 * @description Github按钮组件
 * @param {unknown} _props 按钮props
 * @param {React.Ref<HTMLButtonElement>} ref 按钮ref
 * @return {*}  {React.ReactElement}
 */
function GithubButton(_props: unknown, ref: React.Ref<HTMLButtonElement>): React.ReactElement {
  /**
   * @description 跳转的方法: 跳转到Github仓库
   */
  const handleClick: () => void = useCallback((): void => {
    chrome.tabs.create({
      url: URL,
    })
  }, [])

  return (
    <RoundButton
      ref={ref}
      title={TITLE}
      onClick={handleClick}
    >
      <FontAwesomeIcon
        icon={["fab", "github"]}
        size="2xl"
      />
    </RoundButton>
  )
}

export default forwardRef(GithubButton)
