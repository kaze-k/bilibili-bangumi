import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import style from "./style.module.scss"

/**
 * @description 时间组件
 * @param {TimeProps} props 时间组件Props
 * @param {string} props.children 时间
 * @return {*}  {ReactElement}
 */
function Time(props: TimeProps): ReactElement {
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
