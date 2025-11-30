import { composeRef } from "rc-util/lib/ref"
import type React from "react"
import { forwardRef, useRef } from "react"
import { CSSTransition } from "react-transition-group"
import type { CSSTransitionClassNames } from "react-transition-group/CSSTransition"

interface TransitionOptions {
  inProp?: boolean
  unmountOnExit?: boolean
}

type WrappedComponent<P, T> = React.ForwardRefExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<T>>

type TransitionComponentProps<P> = React.PropsWithoutRef<P> & TransitionOptions

export type ComponentWithTransition<P = unknown, T extends HTMLElement = HTMLElement> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<React.PropsWithoutRef<P> & TransitionOptions> & React.RefAttributes<T>
>

/**
 * @description 过渡动画高阶组件
 * @template P
 * @template T
 * @param {WrappedComponent<P, T>} WrappedComponent 传入组件
 * @param {CSSTransitionClassNames} classNames 过渡动画类名
 * @param {number} [timeout=500] 过渡动画时间
 * @return {*}  {ComponentWithTransition<P, T>} 过渡动画组件
 */
function withTransition<P = unknown, T extends HTMLElement = HTMLElement>(
  WrappedComponent: WrappedComponent<P, T>,
  classNames: CSSTransitionClassNames,
  timeout = 500,
): ComponentWithTransition<P, T> {
  /**
   * @description 过渡动画组件
   * @param {TransitionComponentProps<P>} props 过渡动画组件Props
   * @param {React.Ref<T>} ref 过渡动画组件ref
   * @return {*}  {React.ReactElement}
   */
  function TransitionComponent(props: TransitionComponentProps<P>, ref: React.Ref<T>): React.ReactElement {
    const { inProp, unmountOnExit } = props

    // 节点实例
    const nodeRef: React.RefObject<T> = useRef<T>(null)

    return (
      <CSSTransition
        nodeRef={nodeRef}
        timeout={timeout}
        in={inProp}
        classNames={classNames}
        unmountOnExit={unmountOnExit}
      >
        <WrappedComponent
          {...props}
          ref={composeRef(ref, nodeRef)}
        />
      </CSSTransition>
    )
  }

  return forwardRef(TransitionComponent)
}

export default withTransition
