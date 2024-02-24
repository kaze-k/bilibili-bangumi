import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { memo, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import styled, { CSSProp, StyledComponent } from "styled-components"

import style from "./style.module.scss"

/**
 * @description 包裹层
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {CSSProp}
 */
const Wrapper: StyledComponent<"div", any, DarkModeProps, never> = styled.div(
  (props: DarkModeProps): CSSProp => ({
    color: props.darkMode ? "#ffffff" : "#000000",
    backgroundColor: props.darkMode ? "rgba(0 0 0 / 20%)" : "rgba(255 255 255 / 20%)",
    borderColor: props.darkMode ? "rgba(255 255 255 / 50%)" : "rgba(0 0 0 / 50%)",
  }),
)

/**
 * @description 刷新组件
 * @param {DarkModeProps} props 刷新组件Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {React.ReactElement}
 */
function Refresh(props: DarkModeProps): React.ReactElement {
  // 状态
  const [show, setShow] = useState<boolean>(false)
  const isLoading: boolean = useSelector((state: State): boolean => state.data.isLoading)
  const isError: boolean = useSelector((state: State): boolean => state.data.isError)

  // 当加载状态改变时: 改变加载组件的显示
  useEffect((): (() => void) => {
    let timer: NodeJS.Timeout
    if (isLoading) {
      setShow(true)
    } else {
      timer = setTimeout((): void => {
        setShow(false)
      }, 2000)
    }

    return (): void => {
      clearTimeout(timer)
    }
  }, [isLoading])

  if (show) {
    if (isLoading) {
      return (
        <Wrapper
          className={style.wrapper}
          darkMode={props.darkMode}
        >
          <FontAwesomeIcon
            icon="circle-notch"
            size="xl"
            spin
          />
        </Wrapper>
      )
    } else {
      return (
        <Wrapper
          className={style.wrapper}
          darkMode={props.darkMode}
        >
          <span className={style.text}>{isError ? "更新失败" : "时间表信息已更新"}</span>
        </Wrapper>
      )
    }
  }
}

export default memo(Refresh)
