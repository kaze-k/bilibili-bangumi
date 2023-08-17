import styled from "styled-components"

import style from "./style.module.scss"

/**
 * @description 最新一集的名称
 * @param {EpisodeIndexProps} props 最新一集的名称Props
 * @param {boolean} props.published 是否已更新 [可选]
 * @return {*}  {CSSProp}
 */
const EpisodeIndex: StyledComponent<"div", any, EpisodeIndexProps, never> = styled.div(
  (props: EpisodeIndexProps): CSSProp => ({
    color: props.published ? "#fb7299" : "#808080",
  }),
)

/**
 * @description 剧集组件
 * @param {EpisodeProps} props 剧集Props
 * @param {string} props.title 标题
 * @param {string} props.index 最新一集的名称
 * @param {boolean} props.published 是否已更新 [可选]
 * @return {*}  {ReactElement}
 */
function Episode(props: EpisodeProps): ReactElement {
  return (
    <div className={style.episode}>
      <div
        title={props.title}
        className={style.title}
      >
        {props.title}
      </div>
      <EpisodeIndex
        title={props.index}
        className={style.index}
        published={props.published}
      >
        {props.index}
      </EpisodeIndex>
    </div>
  )
}

export default Episode
