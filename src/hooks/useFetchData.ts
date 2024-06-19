import { useEffect, useMemo, useRef } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import type { Location } from "react-router-dom"

import { useMessage } from "~/components/Message"
import type { Message } from "~/components/Message/types"
import type { AppDispatch, AppState } from "~/store"
import { resetState, update } from "~/store/features/data"

/**
 * @description 请求数据
 */
function useFetchData(): void {
  const dispatch: AppDispatch = useDispatch()
  const message: Message = useMessage()
  const location: Location = useLocation()

  // 状态
  const isError: boolean = useSelector((state: AppState): boolean => state.data.isError)
  const isLoading: boolean = useSelector((state: AppState): boolean => state.data.isLoading)
  const isMounted: React.MutableRefObject<boolean> = useRef<boolean>(false)

  // 缓存uuid
  const id: string = useMemo<string>((): string => crypto.randomUUID(), [])

  // 首次挂载时: 发送更新信息通信
  // 卸载时: 重置状态
  useEffect((): (() => void) => {
    dispatch(update())

    return (): void => {
      dispatch(resetState())
    }
  }, [dispatch])

  // 当路由改变时: 清除消息
  useEffect((): (() => void) => {
    if (location.key !== "default") {
      isMounted.current = true
      message.clear()
    }

    return (): void => {
      isMounted.current = false
    }
  }, [location.key, message])

  // 当错误状态改变时/当加载状态改变时: 改变消息提示
  useEffect((): void => {
    if (isMounted.current) {
      return
    }

    if (isLoading) {
      message.loading(null, { id })
      return
    }

    if (isError) {
      message("更新失败", { id })
      return
    }

    if (isError !== null && isLoading !== null && !isError && !isLoading) {
      message("时间表信息已更新", { id, duration: 2000 })
      return
    }
  }, [id, isError, isLoading, message])
}

export default useFetchData
