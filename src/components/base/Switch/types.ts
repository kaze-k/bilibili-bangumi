import type React from "react"

interface ButtonSpanProps {
  checked: boolean
}

interface SwitchProps extends ButtonSpanProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>
  id: string
}

export { ButtonSpanProps, SwitchProps }
