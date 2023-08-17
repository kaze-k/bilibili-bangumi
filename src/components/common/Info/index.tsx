import IconFont from "~/components/common/IconFont"

import style from "./style.module.scss"

/**
 * @description 信息组件
 * @param {InfoProps} props 信息Props
 * @param {string} props.likes 点赞量 [可选]
 * @param {string} props.coins 投币量 [可选]
 * @param {string} props.favorite 收藏量 [可选]
 * @param {string} props.share 分享量 [可选]
 * @param {string} props.reply 评论量 [可选]
 * @return {*}  {ReactElement}
 */
function Info(props: InfoProps): ReactElement {
  return (
    <div className={style.info}>
      <span title="点赞量">
        <IconFont
          icon="like"
          size="20px"
          block
        />
        {props.likes}
      </span>
      <span title="投币量">
        <IconFont
          icon="coins"
          size="20px"
          block
        />
        {props.coins}
      </span>
      <span title="收藏量">
        <IconFont
          icon="favorite"
          size="20px"
          block
        />
        {props.favorite}
      </span>
      <span title="分享量">
        <IconFont
          icon="share"
          size="20px"
          block
        />
        {props.share}
      </span>
      <span title="评论量">
        <IconFont
          icon="reply"
          size="20px"
          block
        />
        {props.reply}
      </span>
    </div>
  )
}

export default Info
