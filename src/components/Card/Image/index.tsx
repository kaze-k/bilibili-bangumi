import type React from "react"
import { forwardRef, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"

import unfound from "~/assets/images/unfound.jpg"

import { Img } from "./components"
import style from "./style.module.scss"
import type { ImageProps } from "./types"

// 默认图片标题属性
const DEFAULT_TITLE = "图片暂时无法显示"
// 图片加载失败
const IMAGE_ERROR = "图片加载失败"
// 拖放
const DRAGGABLE = false

/**
 * @description 图片组件
 * @param {ImageProps} props 图片Props
 * @param {React.Ref<HTMLImageElement>} ref 图片组件ref
 * @return {*}  {React.ReactElement}
 */
function Image(props: ImageProps, ref: React.Ref<HTMLImageElement>): React.ReactElement {
  const { img = unfound, title, lazy } = props

  // 状态
  const [imageSrc, setImageSrc] = useState<string>((): string => (img.length === 0 ? unfound : img))
  const [titleText, setTitleText] = useState<string>((): string =>
    img !== unfound && img.length !== 0 ? title : DEFAULT_TITLE,
  )
  const [isIntersecting, setIsIntersecting] = useState<boolean>(!lazy)
  const [isLoaded, setIsLoaded] = useState<boolean>(!lazy)

  // 节点实例
  const imageWrapperRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)

  /**
   * @description 处理图片加载失败的方法
   */
  const handleError: () => void = useCallback((): void => {
    setImageSrc(unfound)
    setTitleText(IMAGE_ERROR)
  }, [])

  // 监听图片容器元素是否处于视图
  useLayoutEffect((): (() => void) => {
    const intersectionObserverCallback: IntersectionObserverCallback = (entries: IntersectionObserverEntry[]): void => {
      entries.forEach((entry: IntersectionObserverEntry): void => {
        if (entry.isIntersecting) {
          setIsIntersecting(true)
          observer.disconnect()
        }
      })
    }

    const intersectionObserverOptions: IntersectionObserverInit = {
      root: null, // 视图
      rootMargin: "0px", // 提前加载距离
      threshold: [0, 0.25, 0.5, 0.75, 1], // 触发的阈值
    }

    const observer = new IntersectionObserver(intersectionObserverCallback, intersectionObserverOptions)

    if (imageWrapperRef.current) observer.observe(imageWrapperRef.current)

    return (): void => observer && observer.disconnect && observer.disconnect()
  }, [])

  // 监听网络状态: 网络在线重新请求图片
  useEffect((): (() => void) => {
    const handleOnline: () => void = (): void => imageSrc === unfound && setImageSrc(img)

    window.addEventListener("online", handleOnline)

    return (): void => window.removeEventListener("online", handleOnline)
  }, [imageSrc, img])

  return (
    <div
      ref={imageWrapperRef}
      className={style["image-wrapper"]}
    >
      {isIntersecting && (
        <Img
          ref={ref}
          className={style["image"]}
          src={imageSrc}
          onLoad={(): void => setIsLoaded(true)}
          onError={handleError}
          title={titleText}
          alt={titleText}
          draggable={DRAGGABLE}
          loaded={isLoaded}
        />
      )}
      {!isLoaded && <div className={style["lazy"]} />}
    </div>
  )
}

export default forwardRef(Image)
