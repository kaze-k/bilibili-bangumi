interface MiniButtonDivProps extends DarkModeProps {
  clickable: boolean
}

interface ButtonDivProps extends DarkModeProps {
  clickable: boolean
}

type ButtonBoxProps = {
  clickable: boolean
  mini?: boolean
}

interface ButtonProps extends DarkModeProps {
  children: React.ReactElement | string
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
  title?: string
  mini?: boolean
  clickable?: boolean
}
