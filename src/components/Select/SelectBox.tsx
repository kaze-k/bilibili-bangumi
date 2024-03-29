import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { setType } from "~/store/features/episode"
import { toChineseStyle } from "~/utils"

import { HoverBox, SelectBoxDiv, SelectItem } from "./components"
import style from "./style.module.scss"

const styles: Styles = ["all", "anime", "guochuang"]

/**
 * @description 选项盒
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {React.ReactElement}
 */
function SelectBox(props: DarkModeProps): React.ReactElement {
  const dispatch: Dispatch = useDispatch()

  // 节点实例
  const selectItemsRef: React.RefObject<HTMLUListElement> = useRef<HTMLUListElement>(null)

  // 状态
  const [hover, setHover] = useState<boolean[]>(Array(selectItemsRef?.current?.children?.length).fill(false))
  const index: number = useSelector((state: State): number => state.episode.index)

  /**
   * @description 处理选中的方法: 修改存储选中的元素的索引值的数字
   */
  const handleHover: () => void = (): void => {
    const hovers: boolean[] = [...hover].fill(false)
    hovers[index] = true
    setHover(hovers)
  }

  /**
   * @description 处理点击的方法: 存储选择的类别
   * @param {(episodeType)} style 类别
   */
  const handleClick: (style: episodeType) => void = (style: episodeType): void => {
    dispatch(setType(style))
  }

  // 在索引值改变时: 触发处理选中的方法
  useEffect((): void => {
    handleHover()
  }, [index])

  const selectItems: React.ReactElement[] = styles.map(
    (item: episodeType, index: number): React.ReactElement => (
      <SelectItem
        key={item}
        className={style.select_item}
        hover={hover[index]}
        onClick={(): void => handleClick(item)}
      >
        {toChineseStyle(item)}
      </SelectItem>
    ),
  )

  return (
    <SelectBoxDiv
      className={style.select_box}
      darkMode={props.darkMode}
    >
      <ul
        ref={selectItemsRef}
        className={style.wrapper}
      >
        <HoverBox
          className={style.hover_box}
          index={index}
          darkMode={props.darkMode}
        />
        {selectItems}
      </ul>
    </SelectBoxDiv>
  )
}

export default SelectBox
