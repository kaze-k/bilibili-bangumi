import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"

import RoundButton from "~/components/base/Button/RoundButton"

describe("RoundButton", (): void => {
  it("renders with children", (): void => {
    render(<RoundButton title="Test Button">Click Me</RoundButton>)
    expect(screen.getByText("Click Me")).toBeInTheDocument()
  })

  it("handles click event", (): void => {
    const handleClick: jest.Mock = jest.fn()
    render(<RoundButton onClick={handleClick}>Click Me</RoundButton>)
    fireEvent.click(screen.getByText("Click Me"))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it("does not call onClick when clickable is false", (): void => {
    const handleClick: jest.Mock = jest.fn()
    render(
      <RoundButton
        onClick={handleClick}
        clickable={false}
      >
        Click Me
      </RoundButton>,
    )
    fireEvent.click(screen.getByText("Click Me"))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it("renders with the correct title attribute", (): void => {
    render(<RoundButton title="Test Button">Click Me</RoundButton>)
    expect(screen.getByTitle("Test Button")).toBeInTheDocument()
  })
})
