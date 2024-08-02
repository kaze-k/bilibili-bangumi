import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"

import View from "~/components/base/View"

describe("View", (): void => {
  it("should render children correctly", (): void => {
    render(
      <View>
        <span>Child Content</span>
      </View>,
    )

    const childContent: HTMLElement = screen.getByText("Child Content")
    expect(childContent).toBeInTheDocument()
  })
})
