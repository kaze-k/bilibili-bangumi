import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { forwardRef, useCallback } from "react"
import type React from "react"
import { useDispatch, useSelector } from "react-redux"

import { RoundButton } from "~/components/base"
import type { AppDispatch, AppState } from "~/store"
import { setNotice } from "~/store/features/notice"

// 按钮标题属性
const TITLE = "通知"

// 通知图标
const ICON = {
  enable: (
    <FontAwesomeIcon
      icon="bell"
      size="xl"
    />
  ),
  disable: (
    <FontAwesomeIcon
      icon="bell-slash"
      size="xl"
    />
  ),
}

/**
 * @description 通知按钮组件
 * @param {unknown} _props 按钮props
 * @param {React.Ref<HTMLButtonElement>} ref 按钮ref
 * @return {*}  {React.ReactElement}
 */
function NoticeButton(_props: unknown, ref: React.Ref<HTMLButtonElement>): React.ReactElement {
  const dispatch: AppDispatch = useDispatch()

  // 状态
  const notice: boolean = useSelector((state: AppState): boolean => state.notice.toggle)

  // 通知图标
  const noticeIcon: React.ReactElement = ICON[notice ? "enable" : "disable"]

  /**
   * @description 切换通知的方法
   */
  const toggleNoticeBtn: () => void = useCallback((): void => {
    dispatch(setNotice(!notice))
  }, [notice, dispatch])

  return (
    <RoundButton
      ref={ref}
      title={TITLE}
      onClick={toggleNoticeBtn}
    >
      {noticeIcon}
    </RoundButton>
  )
}

export default forwardRef(NoticeButton)
