import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
import "jest-styled-components"

import IconFont from "~/components/base/IconFont"

describe("IconFont", (): void => {
  it("renders with the correct icon content", (): void => {
    const { container } = render(<IconFont icon="users" />)
    expect(container.firstChild).toHaveStyle({
      "font-family": "iconfont",
    })
    expect(container.firstChild).toHaveStyleRule("content", '"\\e658"', {
      modifier: "::before",
    })
  })

  it("renders with the correct block property", (): void => {
    const { container } = render(
      <IconFont
        icon="views"
        block
      />,
    )
    expect(container.firstChild).toHaveStyle({
      display: "block",
    })
  })

  it("renders with the correct size", (): void => {
    const { container } = render(
      <IconFont
        icon="heart"
        size="2em"
      />,
    )
    expect(container.firstChild).toHaveStyle({
      "font-size": "2em",
    })
  })

  it("renders with the correct default size", (): void => {
    const { container } = render(<IconFont icon="like" />)
    expect(container.firstChild).toHaveStyle({
      "font-size": "1.3em",
    })
  })
})
