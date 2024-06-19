import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import type { Root } from "react-dom/client"

import "~/fontawesome"

import App from "./App"
import "./options.scss"

const root: Root = createRoot(document.getElementById("root"))

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
