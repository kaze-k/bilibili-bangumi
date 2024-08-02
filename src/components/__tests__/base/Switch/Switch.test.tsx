import "@testing-library/jest-dom"
import { fireEvent, render } from "@testing-library/react"

import Switch from "~/components/base/Switch"

describe("Switch", (): void => {
  it("should render correctly", (): void => {
    const handleChange: jest.Mock = jest.fn()
    const { getByRole } = render(
      <Switch
        id="test-switch"
        checked={false}
        onChange={handleChange}
      />,
    )

    const input: HTMLElement = getByRole("checkbox")
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute("id", "test-switch")
    expect(input).not.toBeChecked()
  })

  it("should handle check state changes", (): void => {
    const handleChange: jest.Mock = jest.fn()
    const { getByRole } = render(
      <Switch
        id="test-switch"
        checked={false}
        onChange={handleChange}
      />,
    )

    const input: HTMLElement = getByRole("checkbox")
    fireEvent.click(input)

    expect(handleChange).toHaveBeenCalled()
  })
})
