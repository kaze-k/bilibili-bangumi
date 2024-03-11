import React, { useEffect, useState } from "react"

import Message from "./Message"
import { MessageContainer } from "./components"
import style from "./style.module.scss"

/**
 * @description 消息发送器组件
 * @param {MessagerProps} props 消息发送器组件Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @param {MessageState[]} props.state 消息状态队列
 * @return {*}  {React.ReactElement}
 */
function Messager(props: MessagerProps): React.ReactElement {
  // 状态
  const [top, setTop] = useState<number>(null)

  // 当header组件渲染时: 获取header组件高度设置消息容器的偏移高度
  useEffect((): void => {
    if (document.querySelector("header")?.clientHeight) {
      setTop(document.querySelector("header")?.clientHeight)
    }
  }, [document.querySelector("header")?.clientHeight])

  return (
    <MessageContainer
      top={top}
      className={style.message_container}
    >
      {props.state.map(
        (m: MessageState): React.ReactElement => (
          <Message
            id={m.id}
            key={m.id}
            message={m.message}
            type={m.type}
            darkMode={props.darkMode}
          />
        ),
      )}
    </MessageContainer>
  )
}

export default Messager
