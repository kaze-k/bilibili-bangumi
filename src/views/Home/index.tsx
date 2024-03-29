import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import HomeContent from "~/Layout/Contents/HomeContent"
import { HomeHeader } from "~/Layout/Headers"
import SelectBar from "~/Layout/SelectBar"
import { useMessage } from "~/components/common/Message"
import Page from "~/components/common/Page"
import { clearData, update } from "~/store/features/data"
import { abort } from "~/store/features/data"

/**
 * @description 首页组件
 * @return {*}  {React.ReactElement}
 */
function Home(): React.ReactElement {
  const dispatch: Dispatch = useDispatch()
  const message: ReturnType<typeof useMessage> = useMessage()

  // 状态
  const darkMode: boolean = useSelector((state: State): boolean => state.theme.darkMode)
  const isError: boolean = useSelector((state: State): boolean => state.data.isError)
  const isLoading: boolean = useSelector((state: State): boolean => state.data.isLoading)
  const [id] = useState<string>(crypto.randomUUID())

  /**
   * @description 监听在线: 当网络在线时，发送更新信息通信
   */
  const onlineListener: () => void = (): void => {
    if (window.navigator.onLine) {
      dispatch(update())
    }
  }

  // 首次挂载时: 发生更新信息通信/启用存储
  // 卸载时: 禁用存储/清除数据
  useEffect((): (() => void) => {
    dispatch(update())

    return (): void => {
      dispatch(abort())
      dispatch(clearData())
    }
  }, [])

  // 当网络状态改变时: 监听在线/监听离线
  useEffect((): (() => void) => {
    window.addEventListener("online", onlineListener)

    return (): void => {
      window.removeEventListener("online", onlineListener)
    }
  }, [window.navigator.onLine])

  // 当错误状态改变时/当加载状态改变时: 改变消息提示
  useEffect(() => {
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
  }, [isError, isLoading])

  return (
    <Page darkMode={darkMode}>
      <HomeHeader darkMode={darkMode} />
      <HomeContent darkMode={darkMode} />
      <SelectBar darkMode={darkMode} />
    </Page>
  )
}

export default Home
