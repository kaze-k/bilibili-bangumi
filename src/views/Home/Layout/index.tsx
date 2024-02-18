import React, { memo, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import ErrorPage from "~/components/common/ErrorPage"
import Loading from "~/components/common/Loading"
import Main from "~/components/common/Main"
import Refresh from "~/components/common/Refresh"
import { getAllEpisodes, getAnimeEpisodes, getGuoChuangEpisodes, setIndex } from "~/store/features/data"

import { Container, ContentWrapper, EmptyPage, Wrapper } from "./components"
import style from "./style.module.scss"

/**
 * @description Layout组件
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {React.ReactElement}
 */
function Layout(props: DarkModeProps): React.ReactElement {
  const dispatch: Dispatch = useDispatch()

  // 状态
  const [loading, setLoading] = useState<boolean>(true)
  const change: boolean = useSelector((state: State): boolean => state.storage.change)
  const episodes: [][] = useSelector((state: State): [][] => state.data.episodes)
  const currentIndex: number = useSelector((state: State): number => state.data.currentIndex)
  const episodeStyle: string = useSelector((state: State): string => state.episodeStyle.episodeStyle)
  const dates: [][] = useSelector((state: State): [][] => state.data.dates)
  const isLoading: boolean = useSelector((state: State): boolean => state.data.isLoading)
  const isError: boolean = useSelector((state: State): boolean => state.data.isError)

  // 节点实例
  const pageRef = useRef(null)
  const refreshRef = useRef(null)

  /**
   * @description 处理滚动的方法: 当按住`CTRL`键并滚动鼠标滚轮时滚动
   * @param {React.WheelEvent<HTMLElement>} event 滚动event
   */
  const handleScroll: (event: React.WheelEvent<HTMLElement>) => void = (event: React.WheelEvent<HTMLElement>): void => {
    if (event.ctrlKey) {
      if (event.deltaY > 0) {
        if (currentIndex >= dates.length - 1) {
          return
        }

        dispatch(setIndex(currentIndex + 1))
      } else if (event.deltaY < 0) {
        if (currentIndex <= 0) {
          return
        }

        dispatch(setIndex(currentIndex - 1))
      }
    }
  }

  /**
   * @description 处理信息的方法: 根据剧集类别的不同发送不同的通信
   */
  const handleData: () => void = (): void => {
    switch (episodeStyle) {
      case "all":
        dispatch(getAllEpisodes())
        break

      case "anime":
        dispatch(getAnimeEpisodes())
        break

      case "guochuang":
        dispatch(getGuoChuangEpisodes())
        break
    }
  }

  /**
   * @description
   * 处理点击的方法:
   * - 点击已更新的剧集跳转到最新一集的页面
   * - 点击未更新的剧集跳转到剧集的已更新的集数的页面
   * @param {number} episode_id 剧集episode id
   * @param {number} published 更新的时间戳
   * @param {number} season_id 剧集season id
   */
  const handleClick: (episode_id: number, published: number, season_id: number) => void = (
    episode_id: number,
    published: number,
    season_id: number,
  ): void => {
    if (published && episode_id) {
      chrome.tabs.create({
        url: `https://www.bilibili.com/bangumi/play/ep${episode_id}`,
      })
    } else {
      chrome.tabs.create({
        url: `https://www.bilibili.com/bangumi/play/ss${season_id}`,
      })
    }
  }

  // 当剧集类别改变时/当索引值改变时/当存储信息改变时: 发送通信
  useEffect((): void => {
    if (currentIndex !== null) {
      handleData()
    }
  }, [episodeStyle, currentIndex, change])

  // 当剧集信息获取成功时/当错误状态改变时: 停止加载动画
  useEffect((): (() => void) => {
    let timer: NodeJS.Timeout

    if (episodes.length) {
      setLoading(false)
    } else {
      setLoading(true)

      if (isError) {
        timer = setTimeout((): void => {
          setLoading(false)
        }, 500)
      }
    }

    return (): void => {
      clearTimeout(timer)
    }
  }, [episodes.length, isError])

  // 有数据时渲染的组件
  const containers: (items: {}[]) => React.ReactElement[] = (items: {}[]): React.ReactElement[] =>
    items?.map(
      (item: ContainerItem, index: number): React.ReactElement => (
        <Container
          key={index}
          darkMode={props.darkMode}
          pub_time={item?.pub_time}
          styles={item?.info?.styles}
          likes={item?.info?.stat?.likes}
          coins={item?.info?.stat?.coins}
          favorite={item?.info?.stat?.favorite}
          share={item?.info?.stat?.share}
          reply={item?.info?.stat?.reply}
        >
          <ContentWrapper
            darkMode={props.darkMode}
            handleClick={(): void => handleClick(item?.episode_id, item?.published, item?.season_id)}
            square_cover={item?.square_cover}
            title={item?.title}
            delay={item?.delay}
            delay_reason={item?.delay_reason}
            pub_index={item?.pub_index}
            views={item?.info?.stat?.views}
            danmakus={item?.info?.stat?.danmakus}
            favorites={item?.info?.stat?.favorites}
            score={item?.info?.rating?.score}
            count={item?.info?.rating?.count}
            published={item?.published}
          />
        </Container>
      ),
    )

  // 无数据时渲染的组件
  const noUpdate: React.ReactElement = EmptyPage("今日无内容更新哦~")

  const pages: React.ReactElement[] = episodes?.map(
    (items: [][], indexs: number): React.ReactElement => (
      <div
        key={indexs}
        className={style.page}
      >
        {items.length ? containers(items) : noUpdate}
      </div>
    ),
  )

  if (loading) {
    return (
      <Main darkMode={props.darkMode}>
        <div className={style.wrapper}>
          <Loading />
        </div>
      </Main>
    )
  }

  if (isError && !episodes.length) {
    return (
      <Main darkMode={props.darkMode}>
        <div className={style.wrapper}>
          <ErrorPage />
        </div>
      </Main>
    )
  }

  return (
    <Main darkMode={props.darkMode}>
      <Refresh
        darkMode={props.darkMode}
        isLoading={isLoading}
        ref={refreshRef}
      />
      <Wrapper
        className={style.wrapper}
        index={currentIndex}
        onWheel={(e: React.WheelEvent<HTMLElement>): void => handleScroll(e)}
        ref={pageRef}
      >
        {pages}
      </Wrapper>
    </Main>
  )
}

export default memo(Layout)
