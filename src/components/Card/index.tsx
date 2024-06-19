import type React from "react"
import { forwardRef } from "react"

import Content from "./Content"
import Footer from "./Footer"
import Header from "./Header"
import style from "./style.module.scss"
import type { CardProps } from "./type"

/**
 * @description 卡片组件
 * @param {CardProps} props 卡片Props
 * @param {React.Ref<HTMLDivElement>} ref 卡片组件ref
 * @return {*}  {React.ReactElement}
 */
function Card(props: CardProps, ref: React.Ref<HTMLDivElement>): React.ReactElement {
  const {
    styles,
    pub_time,
    handleClick,
    square_cover,
    title,
    delay,
    delay_reason,
    pub_index,
    views,
    danmakus,
    favorites,
    score,
    count,
    published,
    likes,
    coins,
    favorite,
    share,
    reply,
  } = props

  return (
    <div
      ref={ref}
      className={style["card"]}
    >
      <Header
        pub_time={pub_time}
        styles={styles}
      />
      <Content
        handleClick={handleClick}
        square_cover={square_cover}
        title={title}
        delay={delay}
        delay_reason={delay_reason}
        pub_index={pub_index}
        views={views}
        danmakus={danmakus}
        favorites={favorites}
        score={score}
        count={count}
        published={published}
      />
      <Footer
        likes={likes}
        coins={coins}
        favorite={favorite}
        share={share}
        reply={reply}
      />
    </div>
  )
}

export default forwardRef(Card)
