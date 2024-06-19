import { useEffect, useLayoutEffect, useState } from "react"

type StorageAreaName = "sync" | "local" | "managed" | "session"

/**
 * @description 获取已被使用的存储大小的hook
 * @return {*}  {number} 已被使用的存储大小
 */
function useGetStorageInUse(): number {
  // 状态
  const [usedSize, setUsedSize] = useState<number>(0)

  // 当size改变时: 同步获取本地存储已被使用的存储大小
  useLayoutEffect((): void => {
    chrome.storage.local.getBytesInUse(null, (localSize: number): void => {
      if (localSize !== usedSize) {
        setUsedSize(localSize)
      }
    })
  }, [usedSize])

  // 在size改变时: 监听存储变化，获取本地存储已被使用的存储大小
  useEffect((): (() => void) => {
    /**
     * @description 获取已被使用的存储大小的方法: 实时获取本地存储已被使用的存储大小
     */
    const getStorageInUse: (changes: object, areaName: StorageAreaName) => void = (
      changes: object,
      areaName: StorageAreaName,
    ): void => {
      if (changes && areaName === "local") {
        chrome.storage.local.getBytesInUse(null, (localSize: number): void => {
          setUsedSize(localSize)
        })
      }
    }

    chrome.storage.onChanged.addListener(getStorageInUse)

    return (): void => chrome.storage.onChanged.removeListener(getStorageInUse)
  }, [usedSize])

  return usedSize
}

export default useGetStorageInUse
