interface TextProps {
  title?: string
}

interface RowProps extends TextProps, DarkModeProps {
  text?: string
  children: React.ReactElement
}
