import { forwardRef, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import type React from "react"
import { useDispatch, useSelector } from "react-redux"

import type { AppDispatch, AppState } from "~/store"
import { EpisodeType } from "~/store/enums"
import { setType } from "~/store/features/episode"
import { toChineseType } from "~/utils"

import { HoverBox, SelectItem } from "./components"
import style from "./style.module.scss"

// 选项
const OPTIONS: EpisodeType[] = [EpisodeType.ALL, EpisodeType.ANIME, EpisodeType.GUOCHUANG]

/**
 * @description 渲染选项
 * @param {boolean[]} hover 选项是否选中
 * @param {(type: EpisodeType) => void} handleClick 处理点击的方法
 * @return {*}  {React.ReactElement[]}
 */
function renderSelectItems(hover: boolean[], handleClick: (type: EpisodeType) => void): React.ReactElement[] {
  const selectItems: React.ReactElement[] = OPTIONS.map(
    (type: EpisodeType, i: number): React.ReactElement => (
      <SelectItem
        key={type}
        className={style["select-item"]}
        hover={hover[i]}
        onClick={(): void => handleClick(type)}
      >
        <div className={style["select-item-text"]}>{toChineseType(type)}</div>
      </SelectItem>
    ),
  )

  return selectItems
}

/**
 * @description 选项盒
 * @param {unknown} _props 选择盒子Props
 * @param {React.Ref<HTMLDivElement>} ref 选项盒ref
 * @return {*}  {React.ReactElement}
 */
function SelectBox(_props: unknown, ref: React.Ref<HTMLDivElement>): React.ReactElement {
  const dispatch: AppDispatch = useDispatch()

  // 节点实例
  const selectItemsRef: React.RefObject<HTMLUListElement> = useRef<HTMLUListElement>(null)

  // 状态
  const type: EpisodeType = useSelector((state: AppState): EpisodeType => state.episode.type)
  const [hover, setHover] = useState<boolean[]>(Array(selectItemsRef?.current?.children?.length).fill(false))
  const [index, setIndex] = useState<number>(type === "all" ? 0 : type === "anime" ? 1 : 2)

  /**
   * @description 处理点击的方法: 存储选择的类别
   * @param {(EpisodeType)} type 类别
   */
  const handleClick: (type: EpisodeType) => void = useCallback(
    (type: EpisodeType): void => {
      dispatch(setType(type))
    },
    [dispatch],
  )

  // 在类别改变时: 设置对应的索引
  useLayoutEffect((): void => {
    switch (type) {
      case EpisodeType.ALL:
        setIndex(0)
        break

      case EpisodeType.ANIME:
        setIndex(1)
        break

      case EpisodeType.GUOCHUANG:
        setIndex(2)
        break
    }
  }, [type])

  // 在索引值改变时: 触发处理选中的方法
  useEffect((): void => {
    setHover((preHover: boolean[]): boolean[] => {
      const hovered: boolean[] = [...preHover].fill(false)
      hovered[index] = true
      return hovered
    })
  }, [index])

  return (
    <div
      ref={ref}
      className={style["select-box"]}
    >
      <ul
        ref={selectItemsRef}
        className={style["wrapper"]}
      >
        <HoverBox
          className={style["hover-box"]}
          height={26}
          index={index}
        />
        {renderSelectItems(hover, handleClick)}
      </ul>
    </div>
  )
}

export default forwardRef(SelectBox)
