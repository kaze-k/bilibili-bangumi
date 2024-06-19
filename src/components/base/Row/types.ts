import type React from "react"

interface TextProps {
  title?: string
}

interface RowProps extends TextProps {
  text?: string
  children: React.ReactElement
}

export { TextProps, RowProps }
