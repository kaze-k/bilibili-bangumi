import { forwardRef, useCallback, useEffect, useState } from "react"
import type React from "react"
import { useDispatch } from "react-redux"

import { useMessage } from "~/components/Message"
import type { Message } from "~/components/Message/types"
import { BlockButton } from "~/components/base"
import { useGetStorageInUse } from "~/hooks"
import type { AppDispatch } from "~/store"
import { clearData } from "~/store/features/data"

// 按钮文本
const TEXT = "清理"
// 按钮标题属性
const TITLE = "清理存储"

/**
 * @description 清理本地存储按钮组件
 * @param {unknown} _props 按钮props
 * @param {React.Ref<HTMLButtonElement>} ref 按钮ref
 * @return {*}  {React.ReactElement}
 */
function ClearButton(_props: unknown, ref: React.Ref<HTMLButtonElement>): React.ReactElement {
  const dispatch: AppDispatch = useDispatch()
  const message: Message = useMessage()

  // 状态
  const [clearable, setClearable] = useState<boolean>(false)
  const usedSize: number = useGetStorageInUse()

  /**
   * @description 清除本地存储的方法: 清除本地存储并恢复缓存状态
   */
  const handleClear: () => void = useCallback((): void => {
    message.promise(
      Promise.all([chrome.storage.local.clear(), dispatch(clearData())]).then(
        (): void => setClearable(false),
        (): void => setClearable(true),
      ),
      {
        success: "存储已清理",
        error: "存储清理失败",
      },
    )
  }, [message, dispatch])

  // 当已使用存储变化时: 改变按钮的可用状态
  useEffect((): void => {
    if (usedSize !== 0) setClearable(true)
    else setClearable(false)
  }, [usedSize, dispatch])

  return (
    <BlockButton
      ref={ref}
      title={TITLE}
      onClick={handleClear}
      clickable={clearable}
    >
      {TEXT}
    </BlockButton>
  )
}

export default forwardRef(ClearButton)
