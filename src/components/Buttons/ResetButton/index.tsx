import { forwardRef, useCallback, useEffect, useState } from "react"
import type React from "react"
import { useDispatch } from "react-redux"

import { useMessage } from "~/components/Message"
import type { Message } from "~/components/Message/types"
import { BlockButton } from "~/components/base"
import { useIsInitialState } from "~/hooks"
import { persistor } from "~/store"
import type { AppDispatch } from "~/store"
import { resetStates } from "~/store/rootReducer"

// 按钮文本
const TEXT = "重置设置"
// 按钮标题属性
const TITLE = "重置设置"

/**
 * @description 重置设置按钮组件
 * @param {unknown} _props 按钮props
 * @param {React.Ref<HTMLButtonElement>} ref 按钮ref
 * @return {*}  {React.ReactElement}
 */
function ResetButton(_props: unknown, ref: React.Ref<HTMLButtonElement>): React.ReactElement {
  const dispatch: AppDispatch = useDispatch()
  const message: Message = useMessage()

  // 状态
  const [resettable, setResettable] = useState<boolean>(false)
  const isInitial: boolean = useIsInitialState()

  /**
   * @description 重置设置的方法
   */
  const handleReset: () => void = useCallback((): void => {
    message.promise(
      chrome.storage.sync
        .clear()
        .then((): void => setResettable(false))
        .catch((): void => setResettable(true))
        .finally((): void => {
          dispatch(resetStates())
          persistor.persist()
        }),
      { success: "设置已重置", error: "设置重置失败" },
    )
  }, [message, dispatch])

  // 当设置改变时: 改变按钮的可用状态
  useEffect((): void => {
    if (!isInitial) setResettable(true)
    else setResettable(false)
  }, [isInitial])

  return (
    <BlockButton
      ref={ref}
      title={TITLE}
      onClick={handleReset}
      clickable={resettable}
      btnWidth={"100%"}
      btnHeight={"35px"}
    >
      {TEXT}
    </BlockButton>
  )
}

export default forwardRef(ResetButton)
