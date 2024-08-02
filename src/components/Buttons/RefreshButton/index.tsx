import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { forwardRef, useCallback, useEffect, useState } from "react"
import type React from "react"
import { useDispatch, useSelector } from "react-redux"

import { RoundButton } from "~/components/base"
import { useGetEpisodes } from "~/hooks"
import type { AppDispatch, AppState } from "~/store"
import { getDates, update } from "~/store/features/data"

import type { RefreshButtonProps } from "./types"

// 按钮标题属性
const TITLE = "刷新"

/**
 * @description 清理本地存储按键组件
 * @param {RefreshButtonProps} props 按钮props
 * @param {React.Ref<HTMLButtonElement>} ref 按钮ref
 * @return {*}  {React.ReactElement}
 */
function RefreshButton(props: RefreshButtonProps, ref: React.Ref<HTMLButtonElement>): React.ReactElement {
  const { type } = props

  const dispatch: AppDispatch = useDispatch()
  const handleData: () => void = useGetEpisodes(type)

  // 状态
  const [allowed, setAllowed] = useState<boolean>(true)
  const isLoading: boolean = useSelector((state: AppState): boolean => state.data.isLoading)

  /**
   * @description 处理更新的方法: 发送更新信息通信
   */
  const handleUpdate: () => void = useCallback((): void => {
    if (!isLoading) {
      dispatch(update())
        .then((): void => {
          dispatch(getDates())
          handleData()
        })
        .catch((error: unknown): void => {
          throw error
        })
    }
  }, [isLoading, handleData, dispatch])

  // 当加载状态改变时: 改变按钮的可用状态
  useEffect((): void => {
    setAllowed(!isLoading)
  }, [isLoading])

  return (
    <RoundButton
      ref={ref}
      title={TITLE}
      onClick={handleUpdate}
      clickable={allowed}
    >
      <FontAwesomeIcon
        icon={"redo-alt"}
        size="xl"
        spin={isLoading}
      />
    </RoundButton>
  )
}

export default forwardRef(RefreshButton)
