import { composeRef } from "rc-util/lib/ref"
import type React from "react"
import { Fragment, cloneElement, forwardRef, useEffect, useRef } from "react"

import type { AnimationProps } from "./types"

/**
 * @description 判断元素是否在视口之下
 * @param {HTMLElement} element 元素
 * @return {*}  {boolean}
 */
function isBelowViewPort(element: HTMLElement): boolean {
  const rect: DOMRect = element?.getBoundingClientRect()
  return rect?.top > window.innerHeight
}

/**
 * @description 动画组件
 * @param {AnimationProps} prop 动画组件Props
 * @param {React.Ref<HTMLElement>} ref 动画组件ref
 * @return {*}  {React.ReactElement}
 */
function Animation(prop: AnimationProps, ref: React.Ref<HTMLElement>): React.ReactElement {
  const { children, keyframes, options } = prop

  // 节点实例
  const nodeRef: React.RefObject<HTMLElement> = useRef<HTMLElement>(null)

  // 元素进入视图时: 执行动画
  useEffect((): (() => void) => {
    if (!nodeRef?.current) return
    if (!isBelowViewPort(nodeRef?.current)) return

    const animation: Animation = nodeRef?.current.animate(keyframes, options)
    animation.pause()

    const intersectionObserverCallback: IntersectionObserverCallback = (entries: IntersectionObserverEntry[]): void => {
      entries.forEach((entry: IntersectionObserverEntry): void => {
        if (entry.isIntersecting) {
          if (animation) {
            animation.play()
            observer.unobserve(entry.target)
          }
        }
      })
    }

    const intersectionObserverOptions: IntersectionObserverInit = {
      root: null, // 视图
      rootMargin: "0px", // 提前加载距离
      threshold: 0, // 触发的阈值
    }

    const observer = new IntersectionObserver(intersectionObserverCallback, intersectionObserverOptions)

    if (nodeRef?.current) observer.observe(nodeRef?.current)

    return (): void => observer.disconnect()
  }, [keyframes, options, nodeRef])

  return <Fragment>{cloneElement(children as React.ReactElement, { ref: composeRef(ref, nodeRef) })}</Fragment>
}

export default forwardRef(Animation)
