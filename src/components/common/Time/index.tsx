import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import style from "./style.module.scss"

/**
 * @description 时间组件
 * @param {{ children: string }} props 时间组件Props
 * @return {*}  {React.ReactElement}
 */
function Time(props: { children: string }): React.ReactElement {
  return (
    <div>
      <div>
        <FontAwesomeIcon icon={["far", "clock"]} />
        <span className={style.time}>{props.children}</span>
      </div>
    </div>
  )
}

export default Time
