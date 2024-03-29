import React, { useEffect, useState } from "react"

import ClearButton from "~/components/Buttons/ClearButton"
import Row from "~/components/common/Row"
import useGetStorageInUse from "~/hooks/useGetStorageInUse"
import { formatSize } from "~/utils"

import style from "../style.module.scss"

/**
 * @description 本地存储行组件
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {React.ReactElement}
 */
function LocalStorageRow(props: DarkModeProps): React.ReactElement {
  // 状态
  const [size, setSize] = useState<number>(0)
  const usedSize: number = useGetStorageInUse()

  const text: string = formatSize(size)
  const explain = `本地缓存所占用的空间: ${text}`

  // 当已被使用的存储大小改变时: 更新size的值
  useEffect((): void => {
    setSize(usedSize)
  }, [usedSize])

  return (
    <div className={style.container}>
      <Row
        title={explain}
        text={text}
        darkMode={props.darkMode}
      >
        <ClearButton darkMode={props.darkMode} />
      </Row>
    </div>
  )
}

export default LocalStorageRow
