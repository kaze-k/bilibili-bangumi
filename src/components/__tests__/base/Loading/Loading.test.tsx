import { library } from "@fortawesome/fontawesome-svg-core"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { createRef } from "react"

import Loading from "~/components/base/Loading"

library.add(faSpinner)

describe("Loading", () => {
  it("uses default props when none are provided", () => {
    render(<Loading />)

    const svg = screen.getByRole("img", { hidden: true })

    expect(svg).toBeInTheDocument()
    expect(svg.classList.contains("fa-2xl")).toBeTruthy()
    expect(svg.classList.contains("fa-spinner")).toBeTruthy()
  })

  it("passes icon prop correctly", () => {
    render(<Loading icon="spinner" />)

    const svg = screen.getByRole("img", { hidden: true })

    expect(svg).toBeInTheDocument()
    expect(svg.classList.contains("fa-spinner")).toBeTruthy()
  })

  it("passes size prop correctly", () => {
    render(<Loading size="5x" />)

    const svg = screen.getByRole("img", { hidden: true })

    expect(svg).toBeInTheDocument()
    expect(svg.classList.contains("fa-5x")).toBeTruthy()
  })

  it("forwards ref correctly", () => {
    const ref = createRef<HTMLDivElement>()
    render(<Loading ref={ref} />)

    expect(ref.current).not.toBeNull()
    expect(ref.current?.tagName).toBe("DIV")
    expect(ref.current).toHaveClass("spinner")

    const svg = ref.current?.querySelector("svg")
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveClass("fa-spinner", "fa-2xl", "fa-spin")
  })
})
