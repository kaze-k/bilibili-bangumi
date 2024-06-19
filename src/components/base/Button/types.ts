import type React from "react"

interface ButtonDivProps {
  clickable: boolean
}

type ButtonBoxProps = {
  btnWidth?: string
  btnHeight?: string
  block?: boolean
  clickable: boolean
}

interface ButtonProps {
  children: React.ReactElement | string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  title?: string
}

interface RoundButtonProps extends ButtonProps {
  clickable?: boolean
}

interface BlockButtonProps extends ButtonProps {
  clickable?: boolean
  btnWidth?: string
  btnHeight?: string
}

export { ButtonDivProps, ButtonBoxProps, RoundButtonProps, BlockButtonProps }
