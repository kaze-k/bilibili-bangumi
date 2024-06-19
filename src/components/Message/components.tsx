import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useCallback } from "react"
import styled from "styled-components"
import type { CSSProp, StyledComponent } from "styled-components"

import message from "./handler"
import style from "./style.module.scss"
import type { MessageClearButtonProps, MessageContainerProps } from "./types"

/**
 * @description 消息容器
 * @param {MessageContainerProps} props 消息容器Props
 * @return {*}  {CSSProp}
 */
const MessageContainer: StyledComponent<"div", MessageContainerProps, MessageContainerProps, never> =
  styled.div<MessageContainerProps>(
    (props: MessageContainerProps): CSSProp => ({
      top: props.top,
    }),
  )

/**
 * @description 消息清除按钮
 * @param {MessageClearButtonProps} props 消息清除按钮Props
 * @return {*}  {React.ReactElement}
 */
function MessageClearButton(props: MessageClearButtonProps): React.ReactElement {
  const { id } = props

  /**
   * @description 删除消息方法
   */
  const handleClear: () => void = useCallback((): void => {
    message.remove(id)
  }, [id])

  return (
    <button
      className={style["clear-button"]}
      onClick={handleClear}
    >
      <FontAwesomeIcon
        icon="circle-xmark"
        size="xl"
      />
    </button>
  )
}

export { MessageContainer, MessageClearButton }
