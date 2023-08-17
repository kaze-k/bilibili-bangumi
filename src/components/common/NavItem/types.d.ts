interface NavItmeProps {
  onChange?: ChangeEventHandler<HTMLInputElement>
  onClick?: MouseEventHandler<HTMLInputElement>
  date?: string
  day?: string
  today?: number
  current: number
  checked?: boolean
  name: string
  for: string
  darkMode?: boolean
}

interface DayProps {
  today?: boolean
  checked: boolean
  darkMode?: boolean
}
