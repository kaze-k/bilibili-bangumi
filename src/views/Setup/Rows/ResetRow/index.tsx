import { useEffect, useState } from "react"

import ResetButton from "~/components/Buttons/ResetButton"
import Row from "~/components/common/Row"
import { formatSize } from "~/utils"

import style from "./style.module.scss"

/**
 * @description 重置设置行组件
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {React.ReactElement}
 */
function ResetRow(props: DarkModeProps): React.ReactElement {
  // 状态
  const [size, setSize] = useState<number>(0)

  const titleText = "设置"
  const text: string = formatSize(size)
  const explain = `同步设置所占用的空间: ${text}`

  /**
   * @description 获取同步存储方法: 获取同步存储中已被使用的存储大小
   */
  const getSyncStorage: () => void = (): void => {
    chrome.storage.sync.getBytesInUse((syncSize: number): void => {
      setSize(syncSize)
    })
  }

  /**
   * @description 获取已被使用的存储大小的方法: 实时获取同步存储已被使用的存储大小
   * @return {*}  {Promise<void>} 无返回值
   */
  const getStorageInUse: () => Promise<void> = async (): Promise<void> => {
    chrome.storage.onChanged.addListener((changes: StorageChanges, areaName: StorageAreaName): void => {
      if (changes && areaName === "sync") {
        chrome.storage.sync.getBytesInUse((syncSize: number): void => {
          setSize(syncSize)
        })
      }
    })
  }

  // 在size改变时: 获取已被使用的存储大小
  useEffect((): void => {
    getStorageInUse()
  }, [size])

  // 在页面有改变时: 获取同步存储
  useEffect((): void => {
    getSyncStorage()
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
          <ResetButton darkMode={props.darkMode} />
        </Row>
      </div>
    </div>
  )
}

export default ResetRow
