import style from "./style.module.scss"

/**
 * @description 标签组件
 * @param {TagProps} props 标签组件Props
 * @param {string} props.children 标签内容
 * @return {*}  {ReactElement}
 */
function Tag(props: TagProps): ReactElement {
  return <span className={style.tag}>{props.children}</span>
}

export default Tag
