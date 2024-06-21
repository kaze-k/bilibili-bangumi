import type React from "react"

interface HoverWrapperProps {
  index: number
}

type HoverProps = HoverWrapperProps

interface DayProps {
  today?: boolean
  checked?: boolean
}

interface NavItmeProps extends DayProps {
  onClick?: React.MouseEventHandler<HTMLInputElement>
  date?: string
  day?: string
  name: string
  id: string
}

export { HoverWrapperProps, HoverProps, DayProps, NavItmeProps }
