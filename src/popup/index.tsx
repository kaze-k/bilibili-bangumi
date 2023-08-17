import { createRoot } from "react-dom/client"

import "~/fontawesome"
import "~/iconfont.css"

import Popup from "./popup"
import "./popup.scss"

const root = createRoot(document.getElementById("root") as HTMLElement)

root.render(<Popup />)
