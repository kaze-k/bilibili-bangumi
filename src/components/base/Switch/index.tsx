import { forwardRef } from "react"
import type React from "react"

import { Button, Label } from "./components"
import style from "./style.module.scss"
import type { SwitchProps } from "./types"

/**
 * @description 开关组件
 * @param {SwitchProps} props 开关组件Props
 * @param {React.Ref<HTMLDivElement>} ref 开关组件ref
 * @return {*}  {React.ReactElement}
 */
function Switch(props: SwitchProps, ref: React.Ref<HTMLDivElement>): React.ReactElement {
  const { checked, onChange, id } = props

  return (
    <div
      ref={ref}
      className={style["switch-box"]}
    >
      <input
        className={style["input"]}
        id={id}
        type="checkbox"
        defaultChecked={checked}
        onChange={onChange}
      />
      <Label
        className={style["label"]}
        htmlFor={id}
        checked={checked}
      >
        <Button
          className={style["button"]}
          checked={checked}
        />
      </Label>
    </div>
  )
}

export default forwardRef(Switch)
