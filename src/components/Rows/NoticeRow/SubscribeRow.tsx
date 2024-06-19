import { forwardRef, useCallback } from "react"
import type React from "react"
import { useDispatch, useSelector } from "react-redux"

import { Row, Switch } from "~/components/base"
import type { AppDispatch, AppState } from "~/store"
import { setNotice } from "~/store/features/notice"

import style from "../style.module.scss"

// 行组件文本
const TEXT = "追番"

/**
 * @description 追番行组件
 * @param {unknown} _props 追番行组件Props
 * @param {React.Ref<HTMLDivElement>} ref 追番行组件ref
 * @return {*}  {React.ReactElement}
 */
function SubscribeRow(_props: unknown, ref: React.Ref<HTMLDivElement>): React.ReactElement {
  const dispatch: AppDispatch = useDispatch()

  // 状态
  const notice: boolean = useSelector((state: AppState): boolean => state.notice.toggle)

  /**
   * @description 处理切换的方法: 切换追番通知开关
   */
  const handleSwitch: () => void = useCallback((): void => {
    dispatch(setNotice(!notice))
  }, [notice, dispatch])

  return (
    <div
      ref={ref}
      className={style["container"]}
    >
      <Row text={TEXT}>
        <Switch
          id="notice-switch"
          onChange={handleSwitch}
          checked={notice}
        />
      </Row>
    </div>
  )
}

export default forwardRef(SubscribeRow)
