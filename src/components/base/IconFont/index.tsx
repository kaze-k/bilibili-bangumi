import styled from "styled-components"
import type { CSSProp, StyledComponent } from "styled-components"

import type { IconFontProps } from "./types"

/**
 * @description iconfont图标组件
 * @param {IconFontProps} props iconfont Props
 * @return {*}  {CSSProp}
 */
const IconFont: StyledComponent<"span", IconFontProps, IconFontProps, never> = styled.span<IconFontProps>(
  (props: IconFontProps): CSSProp => {
    const { block, size, icon } = props

    let content: string
    switch (icon) {
      case "users":
        content = `"\\e658"`
        break

      case "views":
        content = `"\\e666"`
        break

      case "danmakus":
        content = `"\\e665"`
        break

      case "heart":
        content = `"\\e667"`
        break

      case "like":
        content = `"\\e65e"`
        break

      case "coins":
        content = `"\\eb25"`
        break

      case "favorite":
        content = `"\\e60f"`
        break

      case "share":
        content = `"\\e632"`
        break

      case "reply":
        content = `"\\e63a"`
        break
    }

    return {
      display: (block && "block") || "inline",
      fontFamily: "iconfont",
      fontSize: size || "1.3em",
      fontStyle: "normal",
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      margin: (block && "5px") || "1px",
      verticalAlign: block ? "baseline" : "-0.05em",
      "::before": {
        content: content,
      },
    }
  },
)

export default IconFont
