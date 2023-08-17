import IconFont from "~/components/common/IconFont"

import style from "./style.module.scss"

/**
 * @description 评分组件
 * @param {RatingProps} props 评分Props
 * @param {number} props.score 评分得分 [可选]
 * @param {string} props.count 评分人数 [可选]
 * @return {*}  {ReactElement}
 */
function Rating(props: RatingProps): ReactElement {
  const icon: ReactElement = <IconFont icon="users" />

  let count: ReactElement
  if (props.count) {
    count = (
      <span
        title={`${props.count}人参与评分`}
        className={style.count}
      >
        {icon}
        {props.count}
      </span>
    )
  } else {
    count = (
      <h4
        className={style.no_score}
        title="暂无评分"
      >
        暂无评分
      </h4>
    )
  }

  return (
    <div className={style.rating}>
      <h1
        title={`评分：${props.score}`}
        className={style.score}
      >
        {props.score}
      </h1>
      {count}
    </div>
  )
}

export default Rating
