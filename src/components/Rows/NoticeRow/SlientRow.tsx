import type React from "react"
import { forwardRef, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"

import { Row, Switch } from "~/components/base"
import type { AppDispatch, AppState } from "~/store"
import { setSilent } from "~/store/features/notice"

import style from "../style.module.scss"

// 行组件文本
const TEXT = "静默通知"
// 提示文本
const EXPLAIN = "开启后，在通知显示时不发出声音或震动"

/**
 * @description 静默通知行组件
 * @param {unknown} _props 静默通知行组件Props
 * @param {React.Ref<HTMLDivElement>} ref 静默通知行组件ref
 * @return {*}  {React.ReactElement}
 */
function SilentRow(_props: unknown, ref: React.Ref<HTMLDivElement>): React.ReactElement {
  const dispatch: AppDispatch = useDispatch()

  // 状态
  const silent: boolean = useSelector((state: AppState): boolean => state.notice.silent)

  /**
   * @description 处理切换的方法: 切换静默通知开关
   */
  const handleSwitch: () => void = useCallback((): void => {
    dispatch(setSilent(!silent))
  }, [silent, dispatch])

  return (
    <div
      ref={ref}
      className={style["container"]}
    >
      <Row
        title={EXPLAIN}
        text={TEXT}
      >
        <Switch
          id="silent-notice-switch"
          onChange={handleSwitch}
          checked={silent}
        />
      </Row>
    </div>
  )
}

export default forwardRef(SilentRow)
