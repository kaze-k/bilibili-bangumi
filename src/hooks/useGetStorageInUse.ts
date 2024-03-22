import { useEffect, useState } from "react"

/**
 * @description 获取已被使用的存储大小的hook
 * @return {*}  {number} 已被使用的存储大小
 */
function useGetStorageInUse(): number {
  // 状态
  const [usedSize, setUsedSize] = useState<number>(0)

  /**
   * @description 获取本地存储的方法: 获取本地存储中已被使用的存储大小
   */
  const getLocalStorage: () => void = (): void => {
    chrome.storage.local.getBytesInUse(null, (localSize: number): void => {
      setUsedSize(localSize)
    })
  }

  /**
   * @description 获取已被使用的存储大小的方法: 实时获取本地存储已被使用的存储大小
   */
  const getStorageInUse: () => void = (): void => {
    chrome.storage.onChanged.addListener((changes: StorageChanges, areaName: StorageAreaName): void => {
      if (changes && areaName === "local") {
        chrome.storage.local.getBytesInUse(null, (localSize: number): void => {
          setUsedSize(localSize)
        })
      }
    })
  }

  // 当页面渲染时: 获取本地存储
  useEffect((): void => {
    getLocalStorage()
  }, [])

  // 在size改变时: 获取已被使用的存储大小
  useEffect((): void => {
    getStorageInUse()
  }, [usedSize])

  return usedSize
}

export default useGetStorageInUse
