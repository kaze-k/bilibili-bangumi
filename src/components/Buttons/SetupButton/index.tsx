import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { forwardRef, useCallback } from "react"
import type React from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import type { NavigateFunction } from "react-router-dom"

import { RoundButton } from "~/components/base"
import type { AppDispatch } from "~/store"
import { abort } from "~/store/features/data"

// 按钮标题属性
const TITLE = "设置"

/**
 * @description 进入设置页面按钮组件
 * @param {unknown} _props 按钮props
 * @param {React.Ref<HTMLButtonElement>} ref 按钮ref
 * @return {*}  {React.ReactElement}
 */
function SetupButton(_props: unknown, ref: React.Ref<HTMLButtonElement>): React.ReactElement {
  const dispath: AppDispatch = useDispatch()
  const navigation: NavigateFunction = useNavigate()

  /**
   * @description 处理点击的方法: 取消请求/进入设置页面并清除消息
   */
  const handleClick: () => void = useCallback((): void => {
    dispath(abort())
    navigation("/setup")
  }, [dispath, navigation])

  return (
    <RoundButton
      ref={ref}
      title={TITLE}
      onClick={handleClick}
    >
      <FontAwesomeIcon
        icon="gear"
        size="xl"
      />
    </RoundButton>
  )
}

export default forwardRef(SetupButton)
