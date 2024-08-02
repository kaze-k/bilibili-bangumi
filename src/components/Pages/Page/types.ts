import type React from "react"

interface PageProps {
  data: object[]
  className?: string
  children?: React.ReactNode
  empty?: React.ReactNode
}

export { PageProps }
