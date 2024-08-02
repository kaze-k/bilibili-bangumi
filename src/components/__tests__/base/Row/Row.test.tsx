import "@testing-library/jest-dom"
import { render } from "@testing-library/react"

import Row from "~/components/base/Row"

describe("Row", (): void => {
  it("renders with title and text", (): void => {
    const { getByTitle, getByText } = render(
      <Row
        title="Test Title"
        text="Test Text"
      >
        <div>Child Element</div>
      </Row>,
    )

    expect(getByTitle("Test Title")).toBeInTheDocument()
    expect(getByText("Test Text")).toBeInTheDocument()
  })

  it("renders with children", (): void => {
    const { getByText } = render(
      <Row
        title="Test Title"
        text="Test Text"
      >
        <div>Child Element</div>
      </Row>,
    )

    expect(getByText("Child Element")).toBeInTheDocument()
  })
})
