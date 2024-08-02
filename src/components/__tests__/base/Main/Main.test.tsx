import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
import "jest-styled-components"

import Main from "~/components/base/Main"

describe("Main", (): void => {
  it("renders with children", (): void => {
    const { getByText } = render(
      <Main className="custom-class">
        <div>Test Child</div>
      </Main>,
    )
    expect(getByText("Test Child")).toBeInTheDocument()
  })

  it("applies the passed className", (): void => {
    const { container } = render(
      <Main className="custom-class">
        <div>Test Child</div>
      </Main>,
    )
    expect(container.firstChild).toHaveClass("custom-class")
  })

  it("has the main class from style module", (): void => {
    const { container } = render(
      <Main className="custom-class">
        <div>Test Child</div>
      </Main>,
    )
    expect(container.firstChild).toHaveClass("main")
  })
})
