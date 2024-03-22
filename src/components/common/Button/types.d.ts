type ButtonColor = {
  light: string
  dark: string
}

type BtnTheme = {
  color: ButtonColor
  backgroundColor: ButtonColor
}

interface BlockButtonDivProps extends DarkModeProps {
  clickable: boolean
  btnTheme?: BtnTheme
}

interface ButtonDivProps extends DarkModeProps {
  clickable: boolean
}

type ButtonBoxProps = {
  clickable: boolean
  btnHeight?: string
  block?: boolean
}

interface ButtonProps extends DarkModeProps {
  children: React.ReactElement | string
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
  title?: string
  clickable?: boolean
}

interface BlockButtonProps extends ButtonProps {
  btnHeight?: string
  btnTheme?: BtnTheme
}
