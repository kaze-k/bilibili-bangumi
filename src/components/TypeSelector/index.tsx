import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { composeRef } from "rc-util/lib/ref"
import { forwardRef, useCallback, useEffect, useRef, useState } from "react"
import type React from "react"
import { useSelector } from "react-redux"

import withTransition from "~/hocs/withTransition"
import type { ComponentWithTransition } from "~/hocs/withTransition"
import type { AppState } from "~/store"
import { EpisodeType } from "~/store/enums"
import { toChineseType } from "~/utils"

import SelectBox from "./SelectBox"
import { SelectButton } from "./components"
import style from "./style.module.scss"
import transition from "./transition.module.scss"

// 过渡动画类名
const CLASSNAMES = {
  enter: transition["enter"],
  enterActive: transition["enter-active"],
  exit: transition["exit"],
  exitActive: transition["exit-active"],
}

// 过渡动画选项盒组件
const SelectBoxWithTransition: ComponentWithTransition<unknown, HTMLDivElement> = withTransition<
  unknown,
  HTMLDivElement
>(SelectBox, CLASSNAMES, 300)

/**
 * @description 剧集类型选择组件
 * @param {unknown} _props 剧集类型选择组件props
 * @param {React.Ref<HTMLDivElement>} ref 剧集类型选择组件ref
 * @return {*}  {React.ReactElement}
 */
function TypeSelector(_props: unknown, ref: React.Ref<HTMLDivElement>): React.ReactElement {
  // 状态
  const [showSelect, setShowSelect] = useState<boolean>(false)
  const type: EpisodeType = useSelector((state: AppState): EpisodeType => state.episode.type)

  // 节点实例
  const selectRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)

  /**
   * @description 处理点击的方法: 切换显示选项的值
   */
  const handleClick: () => void = useCallback((): void => {
    setShowSelect((show: boolean): boolean => !show)
  }, [])

  // 当显示选项盒的时候: 监听document的点击事件和滚动事件
  useEffect((): (() => void) => {
    /**
     * @description 监听事件的回调方法
     * @param {Event} event document event
     */
    const listener: (event: Event) => void = (event: Event): void => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setShowSelect(false)
      }
    }

    if (showSelect) {
      document.addEventListener("click", listener, false)
      document.addEventListener("wheel", listener, false)

      return (): void => {
        document.removeEventListener("click", listener, false)
        document.removeEventListener("wheel", listener, false)
      }
    }
  }, [showSelect])

  return (
    <div
      ref={composeRef(ref, selectRef)}
      className={style["select"]}
    >
      <SelectButton
        className={style["button"]}
        show={showSelect}
        onClick={handleClick}
      >
        <FontAwesomeIcon
          icon="filter"
          size="1x"
        />
        <span className={style["text"]}>{toChineseType(type)}</span>
      </SelectButton>
      <SelectBoxWithTransition
        inProp={showSelect}
        unmountOnExit
      />
    </div>
  )
}

export default forwardRef(TypeSelector)
