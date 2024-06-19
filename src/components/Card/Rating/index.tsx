import { forwardRef } from "react"
import type React from "react"

import { IconFont } from "~/components/base"

import style from "./style.module.scss"
import type { RatingProps } from "./types"

// 组件默认标题属性
const DEFAULT_TITLE = "暂无评分"

/**
 * @description 评分计数
 * @param {RatingProps} props 评分Props
 * @return {*}  {React.ReactElement}
 */
function renderCountElement(props: RatingProps): React.ReactElement {
  const { score, count } = props

  if (!count) {
    return (
      <h4
        className={style["no-score"]}
        title={DEFAULT_TITLE}
      >
        {DEFAULT_TITLE}
      </h4>
    )
  }

  return (
    <>
      <h1
        className={style["score"]}
        title={`评分：${score}`}
      >
        {score}
      </h1>
      <span
        className={style["count"]}
        title={`${count}人参与评分`}
      >
        <IconFont icon="users" />
        {count}
      </span>
    </>
  )
}

/**
 * @description 评分组件
 * @param {RatingProps} props 评分Props
 * @param {React.Ref<HTMLDivElement>} ref 评分组件ref
 * @return {*}  {React.ReactElement}
 */
function Rating(props: RatingProps, ref: React.Ref<HTMLDivElement>): React.ReactElement {
  return (
    <div
      ref={ref}
      className={style["rating"]}
    >
      {renderCountElement(props)}
    </div>
  )
}

export default forwardRef(Rating)
