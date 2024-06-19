import changelog from "CHANGELOG.md"
import type React from "react"
import Markdown, { ExtraProps } from "react-markdown"

import { Main } from "~/components/base"

import style from "./style.module.scss"

// 自定义 Markdown 样式
const components = {
  h1(props: JSX.IntrinsicElements["h1"] & ExtraProps): React.ReactElement {
    const { children } = props
    return <h6 className={style["h1"]}>{children}</h6>
  },
  h2(props: JSX.IntrinsicElements["h2"] & ExtraProps): React.ReactElement {
    const { children } = props
    return <h6 className={style["h2"]}>{children}</h6>
  },
  h3(props: JSX.IntrinsicElements["h3"] & ExtraProps): React.ReactElement {
    const { children } = props
    return <h6 className={style["h3"]}>{children}</h6>
  },
  h4(props: JSX.IntrinsicElements["h4"] & ExtraProps): React.ReactElement {
    const { children } = props
    return <h6 className={style["h4"]}>{children}</h6>
  },
  h5(props: JSX.IntrinsicElements["h5"] & ExtraProps): React.ReactElement {
    const { children } = props
    return <h6 className={style["h5"]}>{children}</h6>
  },
  h6(props: JSX.IntrinsicElements["h6"] & ExtraProps): React.ReactElement {
    const { children } = props
    return <h6 className={style["h6"]}>{children}</h6>
  },
  p(props: JSX.IntrinsicElements["p"] & ExtraProps): React.ReactElement {
    const { children } = props
    return <p className={style["p"]}>{children}</p>
  },
  ul(props: JSX.IntrinsicElements["ul"] & ExtraProps): React.ReactElement {
    const { children } = props
    return <ul className={style["ul"]}>{children}</ul>
  },
  a(props: JSX.IntrinsicElements["a"] & ExtraProps): React.ReactElement {
    const { href, children } = props
    return (
      <a
        className={style["a"]}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    )
  },
}

/**
 * @description 更新日志页面内容组件
 * @return {*}  {React.ReactElement}
 */
function ChangelogContent(): React.ReactElement {
  return (
    <Main className={style["main"]}>
      <div className={style["wrapper"]}>
        <Markdown
          components={components}
          className={style["markdown"]}
        >
          {changelog}
        </Markdown>
      </div>
    </Main>
  )
}

export default ChangelogContent
