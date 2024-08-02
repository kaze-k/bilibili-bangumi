import { composeRef } from "rc-util/lib/ref"
import type React from "react"
import { forwardRef, useEffect, useRef } from "react"

type WrappedComponent<P, T> = React.ForwardRefExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<T>>

export type ComponentWithAnimation<P = unknown, T extends HTMLElement = HTMLElement> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<React.PropsWithoutRef<P>> & React.RefAttributes<T>
>

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
 * @description 动画高阶组件
 * @template P
 * @template T
 * @param {WrappedComponent<P, T>} WrappedComponent 传入组件
 * @param {(Keyframe[] | PropertyIndexedKeyframes)} keyframes 过渡动画
 * @param {(number | KeyframeAnimationOptions)} [options] 过渡动画选项配置
 * @return {*}  {ComponentWithSlideIn<P, T>}
 */
function withAnimation<P = unknown, T extends HTMLElement = HTMLElement>(
  WrappedComponent: WrappedComponent<P, T>,
  keyframes: Keyframe[] | PropertyIndexedKeyframes,
  options?: number | KeyframeAnimationOptions,
): ComponentWithAnimation<P, T> {
  /**
   * @description 动画组件
   * @param {React.PropsWithoutRef<P>} props 动画组件Props
   * @param {React.Ref<T>} ref 动画组件ref
   * @return {*}  {React.ReactElement}
   */
  function AnimationComponent(props: React.PropsWithoutRef<P>, ref: React.Ref<T>): React.ReactElement {
    // 节点实例
    const nodeRef: React.RefObject<T> = useRef<T>(null)

    // 元素进入视图时: 执行动画
    useEffect((): (() => void) => {
      if (!nodeRef?.current) return
      if (!isBelowViewPort(nodeRef?.current)) return

      const animation: Animation = nodeRef?.current.animate(keyframes, options)
      animation.pause()

      const intersectionObserverCallback: IntersectionObserverCallback = (
        entries: IntersectionObserverEntry[],
      ): void => {
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
    }, [nodeRef])

    return (
      <WrappedComponent
        {...props}
        ref={composeRef(ref, nodeRef)}
      />
    )
  }

  return forwardRef(AnimationComponent)
}

export default withAnimation
