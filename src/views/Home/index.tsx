import { throttle } from "lodash"
import { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { clearData, update } from "~/store/features/data"
import { disableStorage, enableStorage, toggleChange } from "~/store/features/storage"
import { updateAutoTheme } from "~/store/features/theme"

import HomeHeader from "./HomeHeader"
import Layout from "./Layout"
import NavBar from "./NavBar"

/**
 * @description 首页组件
 * @return {*}  {ReactElement}
 */
function Home(): ReactElement {
  const dispatch: Dispatch = useDispatch()

  // 状态
  const darkMode: boolean = useSelector((state: State): boolean => state.theme.darkMode)
  const episodeStyle: string = useSelector((state: State): string => state.episodeStyle.episodeStyle)

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

  // 首次挂载时: 更新自动更换主题的状态/启用存储
  // 卸载时: 禁用存储
  useEffect((): (() => void) => {
    dispatch(updateAutoTheme())
    dispatch(enableStorage())

    return (): void => {
      dispatch(disableStorage())
      dispatch(clearData(null))
    }
  }, [])

  // 当剧集类别改变时: 发送更新信息通信
  useEffect((): void => {
    dispatch(update())
  }, [episodeStyle])

  return (
    <>
      <HomeHeader darkMode={darkMode} />
      <Layout darkMode={darkMode} />
      <NavBar darkMode={darkMode} />
    </>
  )
}

export default Home
