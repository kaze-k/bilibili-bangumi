interface ButtonProps extends DarkModeProps {
  children: React.ReactElement | string
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
  title?: string
  mini?: boolean
}
