import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import type { Root } from "react-dom/client"

import "~/fontawesome"
import "~/iconfont.css"

import App from "./App"
import "./popup.scss"

const root: Root = createRoot(document.getElementById("root"))

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
