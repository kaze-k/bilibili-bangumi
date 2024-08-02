import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"

import BlockButton from "~/components/base/Button/BlockButton"

describe("BlockButton", (): void => {
  test("renders with children", (): void => {
    render(<BlockButton>Click me</BlockButton>)
    expect(screen.getByText("Click me")).toBeInTheDocument()
  })

  test("calls onClick handler when clickable and button is clicked", (): void => {
    const handleClick: jest.Mock = jest.fn()
    render(
      <BlockButton
        clickable
        onClick={handleClick}
      >
        Click me
      </BlockButton>,
    )

    fireEvent.click(screen.getByText("Click me"))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test("does not call onClick handler when not clickable", (): void => {
    const handleClick: jest.Mock = jest.fn()
    render(
      <BlockButton
        clickable={false}
        onClick={handleClick}
      >
        Click me
      </BlockButton>,
    )

    fireEvent.click(screen.getByText("Click me"))
    expect(handleClick).not.toHaveBeenCalled()
  })

  test("applies width and height correctly", (): void => {
    const { container } = render(
      <BlockButton
        btnWidth={"100px"}
        btnHeight={"50px"}
      >
        Click me
      </BlockButton>,
    )
    const button: HTMLButtonElement = container.querySelector("button")

    expect(button).toHaveStyle("width: 100px")
    expect(button).toHaveStyle("height: 50px")
  })

  test("renders with title attribute", (): void => {
    render(<BlockButton title="This is a button">Click me</BlockButton>)
    expect(screen.getByTitle("This is a button")).toBeInTheDocument()
  })
})
