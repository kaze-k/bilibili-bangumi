import styled from "styled-components"

import Card from "~/components/common/Card"
import Episode from "~/components/common/Episode"
import Image from "~/components/common/Image"
import Info from "~/components/common/Info"
import Rating from "~/components/common/Rating"
import Stat from "~/components/common/Stat"
import Tag from "~/components/common/Tag"
import Time from "~/components/common/Time"
import { formatNum } from "~/utils"

import style from "./style.module.scss"

/**
 * @description 内容
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {CSSProp}
 */
const Content: StyledComponent<"div", any, DarkModeProps, never> = styled.div(
  (props: DarkModeProps): CSSProp => ({
    borderTop: props.darkMode ? "1px solid #2a333f" : "1px solid #eee",
    borderBottom: props.darkMode ? "1px solid #2a333f" : "1px solid #eee",
  }),
)

/**
 * @description 页面
 * @param {PageProps} props 页面Props
 * @param {number} props.index 页面索引值
 * @return {*}  {CSSProp}
 */
const Page: StyledComponent<"div", any, PageProps, never> = styled.div(
  (props: PageProps): CSSProp => ({
    transform: `translateX(${-360 * props.index}px)`,
  }),
)

/**
 * @description 遍历标签组件
 * @param {string[]} styles 标签
 * @return {*}  {ReactElement[]}
 */
function Tags(styles: string[]): ReactElement[] {
  return styles.map((style: string, index: number): ReactElement => <Tag key={index}>{style}</Tag>)
}

/**
 * @description 内容包裹
 * @param {ContentWrapperProps} props 内容包裹Props
 * @param {MouseEventHandler<HTMLDivElement>} props.handleClick 处理点击的方法
 * @param {string} props.square_cover 封面图片 [可选]
 * @param {string} props.title 标题 [可选]
 * @param {boolean} props.delay 是否延迟更新 [可选]
 * @param {string} props.delay_reason 延迟更新的原因 [可选]
 * @param {string} props.pub_index 最新一集的名称 [可选]
 * @param {number} props.views 播放数 [可选]
 * @param {number} props.danmakus 弹幕数 [可选]
 * @param {number} props.favorites 追番数 [可选]
 * @param {number} props.score 评分得分 [可选]
 * @param {number} props.count 评分人数 [可选]
 * @param {boolean} props.published 是否已更新 [可选]
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {ReactElement}
 */
function ContentWrapper(props: ContentWrapperProps): ReactElement {
  return (
    <Content
      className={style.content}
      darkMode={props.darkMode}
      onClick={props.handleClick}
    >
      <Image
        img={props.square_cover}
        title={props.title}
      />
      <div className={style.context}>
        <Episode
          published={props.published}
          title={props.title}
          index={props.delay ? props.delay_reason : props.pub_index}
        />
        <Stat
          views={formatNum(props.views)}
          danmakus={formatNum(props.danmakus)}
          favorites={formatNum(props.favorites)}
        />
      </div>
      <Rating
        score={props.score}
        count={formatNum(props.count)}
      />
    </Content>
  )
}

/**
 * @description 容器
 * @param {ContainerProps} props 容器Props
 * @param {string} props.pub_time 更新时间 [可选]
 * @param {string} props.styles 类型 [可选]
 * @param {number} props.likes 点赞量 [可选]
 * @param {number} props.coins 投币量 [可选]
 * @param {number} props.favorite 收藏量 [可选]
 * @param {number} props.share 分享量 [可选]
 * @param {number} props.reply 评论量 [可选]
 * @param {ReactElement} props.children 子组件 [可选]
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {ReactElement}
 */
function Container(props: ContainerProps): ReactElement {
  return (
    <div className={style.container}>
      <Card
        darkMode={props.darkMode}
        headerLeft={<Time>{props.pub_time}</Time>}
        headerRight={Tags(props.styles)}
        footer={
          <Info
            likes={formatNum(props.likes)}
            coins={formatNum(props.coins)}
            favorite={formatNum(props.favorite)}
            share={formatNum(props.share)}
            reply={formatNum(props.reply)}
          />
        }
      >
        {props.children}
      </Card>
    </div>
  )
}

export { Page, ContentWrapper, Container }
