import { forwardRef, useEffect, useState } from "react"
import type React from "react"

import { ClearButton } from "~/components/Buttons"
import { Row } from "~/components/base"
import { useGetStorageInUse } from "~/hooks"
import { formatSize } from "~/utils"

import style from "../style.module.scss"

/**
 * @description 本地存储行组件
 * @param {unknown} _props 本地存储行组件Props
 * @param {React.Ref<HTMLDivElement>} ref 本地存储行组件ref
 * @return {*}  {React.ReactElement}
 */
function LocalStorageRow(_props: unknown, ref: React.Ref<HTMLDivElement>): React.ReactElement {
  // 状态
  const [size, setSize] = useState<number>(0)
  const usedSize: number = useGetStorageInUse()

  // 提示文本
  const text: string = formatSize(size)
  const explain = `本地缓存所占用的空间: ${text}`

  // 当已被使用的存储大小改变时: 更新size的值
  useEffect((): void => {
    setSize(usedSize)
  }, [usedSize])

  return (
    <div
      ref={ref}
      className={style["container"]}
    >
      <Row
        title={explain}
        text={text}
      >
        <ClearButton />
      </Row>
    </div>
  )
}

export default forwardRef(LocalStorageRow)
