import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { RoundButton } from "~/components/common/Button"
import { disableNotice, enableNotice, toggleNotice } from "~/store/features/notice"

/**
 * @description 通知按钮组件
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {React.ReactElement}
 */
function NoticeButton(props: DarkModeProps): React.ReactElement {
  const dispatch: Dispatch = useDispatch()

  // 状态
  const notice: boolean = useSelector((state: State): boolean => state.notice.toggle)

  /**
   * @description 切换通知的方法
   */
  const toggleNoticeBtn: () => void = (): void => {
    dispatch(toggleNotice())
    notice ? dispatch(disableNotice()) : dispatch(enableNotice())
  }

  /**
   * @description 处理发送通信的方法
   */
  const handleNotice: () => void = (): void => {
    notice ? dispatch(enableNotice()) : dispatch(disableNotice())
  }

  // 当页面渲染时: 发送通信
  useEffect((): void => {
    handleNotice()
  }, [])

  let icon: React.ReactElement
  if (notice) {
    icon = (
      <FontAwesomeIcon
        icon="bell"
        size="xl"
      />
    )
  } else {
    icon = (
      <FontAwesomeIcon
        icon="bell-slash"
        size="xl"
      />
    )
  }

  return (
    <RoundButton
      title="通知"
      onClick={toggleNoticeBtn}
      darkMode={props.darkMode}
    >
      {icon}
    </RoundButton>
  )
}

export default NoticeButton
