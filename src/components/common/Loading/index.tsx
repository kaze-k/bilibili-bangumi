import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"

import { updateAutoTheme } from "~/store/features/theme"

import style from "./style.module.scss"

/**
 * @description 加载动画盒子
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 */
const LoadingBox: StyledComponent<"div", any, DarkModeProps, never> = styled.div(
  (props: DarkModeProps): CSSProp => ({
    color: props.darkMode ? "#343a43" : "#fb7299",
    backgroundColor: props.darkMode ? "#000000" : "#ffffff",
  }),
)

/**
 * @description 加载动画组件
 * @return {*}  {ReactElement}
 */
function Loading(): ReactElement {
  const dispatch: Dispatch = useDispatch()

  // 状态
  const darkMode: boolean = useSelector((state: State): boolean => state.theme.darkMode)

  // 首次挂载时: 更新自动更换主题的状态
  useEffect((): void => {
    dispatch(updateAutoTheme())
  }, [])

  return (
    <LoadingBox
      className={style.loading}
      darkMode={darkMode}
    >
      <FontAwesomeIcon
        icon="spinner"
        size="2xl"
        spin
      />
    </LoadingBox>
  )
}

export default Loading
