import style from "./style.module.scss"

/**
 * @description 标签组件
 * @param {{ children: string }} props 标签组件Props
 * @return {*}  {React.ReactElement}
 */
function Tag(props: { children: string }): React.ReactElement {
  return <span className={style.tag}>{props.children}</span>
}

export default Tag
