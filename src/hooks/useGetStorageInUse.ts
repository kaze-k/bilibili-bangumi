import React, { useEffect, useState } from "react"

function useGetStorageInUse(): [number, React.Dispatch<React.SetStateAction<number>>] {
  // 状态
  const [size, setSize] = useState<number>(0)

  /**
   * @description 获取已被使用的存储大小的方法: 实时获取本地存储已被使用的存储大小
   */
  const getStorageInUse: () => void = (): void => {
    chrome.storage.onChanged.addListener((changes: StorageChanges, areaName: StorageAreaName): void => {
      if (changes && areaName === "local") {
        chrome.storage.local.getBytesInUse(null, (localSize: number): void => {
          setSize(localSize)
        })
      }
    })
  }

  // 在size改变时: 获取已被使用的存储大小
  useEffect((): void => {
    getStorageInUse()
  }, [size])

  return [size, setSize]
}

export default useGetStorageInUse
