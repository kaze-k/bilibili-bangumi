import styled, { CSSProp, StyledComponent } from "styled-components"

/**
 * @description iconfont图标组件
 * @param {IconFontProps} props iconfont Props
 * @param {boolean} props.block 块状样式 [可选]
 * @param {string} props.size 大小 [可选]
 * @param {string} props.icon 图标名称
 * @return {*}  {CSSProp}
 */
const IconFont: StyledComponent<"span", any, IconFontProps, never> = styled.span((props: IconFontProps): CSSProp => {
  let content: string
  switch (props.icon) {
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
    display: (props.block && "block") || "inline",
    fontFamily: "iconfont",
    fontSize: props.size || "1.3em",
    fontStyle: "normal",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    margin: (props.block && "5px") || "1px",
    verticalAlign: props.block ? "baseline" : "-0.05em",
    "::before": {
      content: content,
    },
  }
})

export default IconFont
