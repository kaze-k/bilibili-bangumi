import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
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
  }),
)

/**
 * @description 刷新组件
 * @param {RefreshProp} props 刷新组件Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @param {boolean} props.isLoading 是否加载 [可选]
 * @param {*} ref 属性
 * @return {*}  {React.ReactElement}
 */
function Refresh(props: RefreshProp, ref: React.Ref<RefreshInit>): React.ReactElement {
  // 状态
  const [controller, setController] = useState<boolean>(false)
  const isLoading: boolean = useSelector((state: State): boolean => state.data.isLoading)
  const isError: boolean = useSelector((state: State): boolean => state.data.isError)

  // 节点实例
  const refreshRef: React.RefObject<HTMLDivElement> = useRef(null)

  // 当加载状态改变时: 改变加载组件的显示
  useEffect((): void => {
    if (isLoading) {
      setController(true)
    } else {
      setTimeout((): void => {
        setController(false)
      }, 1500)
    }
  }, [isLoading])

  // 当错误状态改变时: 改变加载组件的显示
  useEffect((): void => {
    if (isError) {
      setController(true)
    } else {
      setTimeout((): void => {
        setController(false)
      }, 1500)
    }
  }, [isError])

  // 需要暴露的属性
  useImperativeHandle(
    ref,
    (): RefreshInit => ({
      visible: refreshRef.current ? true : false,
    }),
  )

  if (controller) {
    if (props.isLoading) {
      return (
        <Wrapper
          className={style.wrapper}
          darkMode={props.darkMode}
          ref={refreshRef}
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
          ref={refreshRef}
        >
          <span className={style.text}>{isError ? "更新失败" : "时间表信息已更新"}</span>
        </Wrapper>
      )
    }
  }
}

export default forwardRef(Refresh)
