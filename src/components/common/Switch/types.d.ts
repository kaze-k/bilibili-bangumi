interface SwitchProps {
  checked: boolean
  onChange: ChangeEventHandler<HTMLInputElement>
  id: string
  darkMode?: boolean
}

interface LabelProps {
  darkMode?: boolean
  htmlFor: string
  checked: boolean
}

interface ButtonSpanProps {
  darkMode?: boolean
  checked: boolean
}

type SwitchChangeEvent = ChangeEvent<HTMLInputElement>
