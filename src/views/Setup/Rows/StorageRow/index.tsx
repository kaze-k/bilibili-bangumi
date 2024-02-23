import React, { useEffect, useState } from "react"

import ClearButton from "~/components/Buttons/ClearButton"
import Row from "~/components/common/Row"
import { formatSize } from "~/utils"

import style from "./style.module.scss"

/**
 * @description 存储行组件
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {React.ReactElement}
 */
function StorageRow(props: DarkModeProps): React.ReactElement {
  // 状态
  const [size, setSize] = useState<number>(0)

  const titleText = "存储"
  const text: string = formatSize(size)
  const explain = `本地缓存所占用的空间: ${text}`

  /**
   * @description 获取本地存储的方法: 获取本地存储中已被使用的存储大小
   */
  const getLocalStorage: () => void = (): void => {
    chrome.storage.local.getBytesInUse(null, (localSize: number): void => {
      setSize(localSize)
    })
  }

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

  // 在页面有改变时: 获取本地存储
  useEffect((): void => {
    getLocalStorage()
  })

  return (
    <div className={style.wrapper}>
      <div className={style.title_text}>{titleText}</div>
      <div className={style.content}>
        <Row
          title={explain}
          text={text}
          darkMode={props.darkMode}
        >
          <ClearButton darkMode={props.darkMode} />
        </Row>
      </div>
    </div>
  )
}

export default StorageRow
