import { useLayoutEffect, useState } from "react"
import type React from "react"
import { CSSTransition, TransitionGroup } from "react-transition-group"

import Message from "./Message"
import { MessageContainer } from "./components"
import style from "./style.module.scss"
import transition from "./transition.module.scss"
import type { MessageState, MessagerProps } from "./types"

// 过渡动画类名
const CLASSNAMES = {
  enter: transition["enter"],
  enterActive: transition["enter-active"],
  exit: transition["exit"],
  exitActive: transition["exit-active"],
}

/**
 * @description 消息发送器组件
 * @param {MessagerProps} props 消息发送器组件Props
 * @return {*}  {React.ReactElement}
 */
function Messager(props: MessagerProps): React.ReactElement {
  const { state } = props

  // 状态
  const [top, setTop] = useState<number>(0)

  const clientHeight: number = document.querySelector("header")?.clientHeight

  // 当header组件渲染时: 获取header组件高度设置消息容器的偏移高度
  useLayoutEffect((): void => {
    if (clientHeight) {
      setTop(clientHeight)
    }
  }, [clientHeight])

  return (
    <MessageContainer
      top={top}
      className={style["message-container"]}
    >
      <TransitionGroup component={null}>
        {state.map(
          (m: MessageState): React.ReactElement => (
            <CSSTransition
              key={m.id}
              timeout={300}
              classNames={CLASSNAMES}
              nodeRef={m.nodeRef}
            >
              <Message
                id={m.id}
                key={m.id}
                message={m.message}
                type={m.type}
                ref={m.nodeRef}
              />
            </CSSTransition>
          ),
        )}
      </TransitionGroup>
    </MessageContainer>
  )
}

export default Messager
