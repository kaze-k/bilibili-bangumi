import { DebouncedFunc, throttle } from "lodash"
import { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { useMessage } from "~/components/common/Message"
import { clearData, update } from "~/store/features/data"
import { disableStorage, enableStorage, toggleChange } from "~/store/features/storage"
import { updateAutoTheme } from "~/store/features/theme"

import HomeHeader from "./HomeHeader"
import Layout from "./Layout"
import NavBar from "./NavBar"

/**
 * @description 首页组件
 * @return {*}  {React.ReactElement}
 */
function Home(): React.ReactElement {
  const dispatch: Dispatch = useDispatch()
  const message: Message = useMessage()

  // 状态
  const darkMode: boolean = useSelector((state: State): boolean => state.theme.darkMode)
  const isLoading: boolean = useSelector((state: State): boolean => state.data.isLoading)
  const isError: boolean = useSelector((state: State): boolean => state.data.isError)

  // 节流
  const handleThrottle: DebouncedFunc<() => void> = useCallback(
    throttle((): void => {
      dispatch(toggleChange())
    }, 1000),
    [],
  )

  /**
   * @description 获取存储改变的方法: 实时获取本地存储是否改变
   */
  const storageChange: () => void = (): void => {
    chrome.storage.onChanged.addListener((changes: StorageChanges, areaName: StorageAreaName): void => {
      const storageKeys: string[] = ["anime_dates", "anime_episodes", "guochuang_dates", "guochuang_episodes"]
      if (changes && areaName === "local") {
        storageKeys.map((storageKey: string): void => {
          if (storageKey in changes) {
            handleThrottle()
          }
        })
      }
    })
  }

  // 当本地存储改变时: 获取存储改变的方法
  useEffect((): void => {
    storageChange()
  })

  // 首次挂载时: 发生更新信息通信/更新自动更换主题的状态/启用存储
  // 卸载时: 禁用存储/清除数据
  useEffect((): (() => void) => {
    dispatch(update())
    dispatch(updateAutoTheme())
    dispatch(enableStorage())

    return (): void => {
      dispatch(disableStorage())
      dispatch(clearData(null))
    }
  }, [])

  // 当错误状态改变时/加载状态改变时: 更新提示信息
  useEffect((): void => {
    message(isError ? "更新失败" : "时间表信息已更新", { isLoading })
  }, [isError, isLoading])

  return (
    <>
      <HomeHeader darkMode={darkMode} />
      <Layout darkMode={darkMode} />
      <NavBar darkMode={darkMode} />
    </>
  )
}

export default Home
