interface ButtonSpanProps extends DarkModeProps {
  checked: boolean
}

interface SwitchProps extends ButtonSpanProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>
  id: string
}

interface LabelProps extends ButtonSpanProps {
  htmlFor: string
  checked: boolean
}
