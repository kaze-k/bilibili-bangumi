import type React from "react"
import { forwardRef, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"

import { Row, Switch } from "~/components/base"
import type { AppDispatch, AppState } from "~/store"
import { setGuoChuangNotice } from "~/store/features/notice"

import style from "../style.module.scss"

// 行组件文本
const TEXT = "国创"

/**
 * @description 国创通知行组件
 * @param {unknown} _props 国创通知行组件Props
 * @param {React.Ref<HTMLDivElement>} ref 国创通知行组件ref
 * @return {*}  {React.ReactElement}
 */
function GuoChuangRow(_props: unknown, ref: React.Ref<HTMLDivElement>): React.ReactElement {
  const dispatch: AppDispatch = useDispatch()

  // 状态
  const guochuangNotice: boolean = useSelector((state: AppState): boolean => state.notice.guochuangNotice)

  /**
   * @description 处理切换的方法: 切换国创通知开关
   */
  const handleSwitch: () => void = useCallback((): void => {
    dispatch(setGuoChuangNotice(!guochuangNotice))
  }, [guochuangNotice, dispatch])

  return (
    <div
      ref={ref}
      className={style["container"]}
    >
      <Row text={TEXT}>
        <Switch
          id="guochuang-notice-switch"
          onChange={handleSwitch}
          checked={guochuangNotice}
        />
      </Row>
    </div>
  )
}

export default forwardRef(GuoChuangRow)
