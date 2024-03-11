import styled, { CSSProp, StyledComponent } from "styled-components"

/**
 * @description 消息容器
 * @param {MessageContainerProps} props 消息容器Props
 * @param {number} props.top 消息容器距离顶部距离
 * @return {*}  {CSSProp}
 */
const MessageContainer: StyledComponent<"div", any, MessageContainerProps, never> = styled.div(
  (props: MessageContainerProps): CSSProp => ({
    top: props.top,
  }),
)

/**
 * @description 消息包裹层
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {CSSProp}
 */
const MessageWrapper: StyledComponent<"div", any, DarkModeProps, never> = styled.div(
  (props: DarkModeProps): CSSProp => ({
    color: props.darkMode ? "#ffffff" : "#000000",
    backgroundColor: props.darkMode ? "#000000" : "#fffdfa",
    boxShadow: props.darkMode ? "0 0 0 2px #fffdfa" : "0 0 0 #000000, 0 0 0 #000000, 0px 1px 2px rgba(126, 56, 0, 50%)",
  }),
)

/**
 * @description 消息按钮包裹层
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {CSSProp}
 */
const MessageButtonWrapper: StyledComponent<"div", any, DarkModeProps, never> = styled.div(
  (props: DarkModeProps): CSSProp => ({
    color: props.darkMode ? "rgba(52, 58, 67, 0.8)" : "rgba(251, 114, 153, 0.5)",
    ":hover": {
      color: props.darkMode ? "#343a43" : "#fb7299",
    },
  }),
)

export { MessageContainer, MessageWrapper, MessageButtonWrapper }
