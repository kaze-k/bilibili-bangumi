import IconFont from "~/components/common/IconFont"

import style from "./style.module.scss"

/**
 * @description 状态组件
 * @param {StatProps} props 状态组件Props
 * @param {string} props.views 播放数 [可选]
 * @param {string} props.danmakus 弹幕数 [可选]
 * @param {string} props.favorites 追番数 [可选]
 * @return {*}  {React.ReactElement}
 */
function Stat(props: StatProps): React.ReactElement {
  return (
    <div className={style.stat}>
      <div title={`播放数：${props.views}`}>
        <IconFont icon="views" /> {props.views}
      </div>
      <div title={`弹幕数：${props.danmakus}`}>
        <IconFont icon="danmakus" /> {props.danmakus}
      </div>
      <div title={`追番数：${props.favorites}`}>
        <IconFont icon="heart" /> {props.favorites}
      </div>
    </div>
  )
}

export default Stat
