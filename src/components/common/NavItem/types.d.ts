interface DayProps extends DarkModeProps {
  today?: boolean
  checked?: boolean
}

interface NavItmeProps extends DayProps {
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onClick?: React.MouseEventHandler<HTMLInputElement>
  date?: string
  day?: string
  current: number
  name: string
  for: string
}
