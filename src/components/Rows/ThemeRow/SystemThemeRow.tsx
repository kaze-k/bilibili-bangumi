import { forwardRef, useCallback } from "react"
import type React from "react"
import { useDispatch, useSelector } from "react-redux"

import { Row, Switch } from "~/components/base"
import type { AppDispatch, AppState } from "~/store"
import { setSysTheme } from "~/store/features/theme"

import style from "../style.module.scss"

// 行组件文本
const TEXT = "跟随系统"

/**
 * @description 跟随系统主题行组件
 * @param {unknown} _props 跟随系统主题行组件Props
 * @param {React.Ref<HTMLDivElement>} ref 跟随系统主题行组件ref
 * @return {*}  {React.ReactElement}
 */
function SystemThemeRow(_props: unknown, ref: React.Ref<HTMLDivElement>): React.ReactElement {
  const dispatch: AppDispatch = useDispatch()

  // 状态
  const system: boolean = useSelector((state: AppState): boolean => state.theme.system)

  /**
   * @description 处理改变的方法: 切换跟随系统主题的状态
   */
  const handleSwitch: () => void = useCallback((): void => {
    dispatch(setSysTheme(!system))
  }, [system, dispatch])

  return (
    <div
      ref={ref}
      className={style["container"]}
    >
      <Row text={TEXT}>
        <Switch
          id="system-switch"
          onChange={handleSwitch}
          checked={system}
        />
      </Row>
    </div>
  )
}

export default forwardRef(SystemThemeRow)
