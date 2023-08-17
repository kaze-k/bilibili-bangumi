import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import Loading from "~/components/common/Loading"
import Main from "~/components/common/Main"
import { getAllEpisodes, getAnimeEpisodes, getGuoChuangEpisodes, setIndex } from "~/store/features/data"

import { Container, ContentWrapper, Page } from "./components"
import style from "./style.module.scss"

/**
 * @description Layout组件
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {ReactElement}
 */
function Layout(props: DarkModeProps): ReactElement {
  const dispatch: Dispatch = useDispatch()

  // 状态
  const [loading, setLoading] = useState<boolean>(true)
  const change: boolean = useSelector((state: State): boolean => state.storage.change)
  const episodes: Array<[]> = useSelector((state: State): Array<[]> => state.data.episodes)
  const currentIndex: number = useSelector((state: State): number => state.data.currentIndex)
  const episodeStyle: string = useSelector((state: State): string => state.episodeStyle.episodeStyle)
  const dates: Array<[]> = useSelector((state: State): Array<[]> => state.data.dates)

  /**
   * @description 处理滚动的方法: 当按住`CTRL`键并滚动鼠标滚轮时滚动
   * @param {MainWheelEvent} event 滚动event
   */
  const handleScroll: (event: MainWheelEvent) => void = (event: MainWheelEvent): void => {
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
   * @param {number} pub_ts 更新的时间戳
   * @param {number} season_id 剧集season id
   */
  const handleClick: (episode_id: number, pub_ts: number, season_id: number) => void = (
    episode_id: number,
    pub_ts: number,
    season_id: number,
  ): void => {
    const now: number = new Date().getTime()
    const pub_time: number = pub_ts * 1000
    if (pub_time <= now && episode_id) {
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
    if (typeof currentIndex !== "undefined") {
      handleData()
    }
  }, [episodeStyle, currentIndex, change])

  // 当剧集信息获取成功时: 停止加载动画
  useEffect((): void => {
    if (episodes.length) {
      setLoading(false)
    } else {
      setLoading(true)
    }
  }, [episodes])

  // 有数据时渲染的组件
  const Containers: (items: object[]) => ReactElement[] = (items: object[]): ReactElement[] =>
    items?.map(
      (item: ContainerItem, index: number): ReactElement => (
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
            handleClick={(): void => handleClick(item?.episode_id, item?.pub_ts, item?.season_id)}
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

  const Pages: ReactElement[] = episodes?.map(
    (items: Array<[]>, indexs: number): ReactElement => (
      <Page
        key={indexs}
        className={style.page}
        index={currentIndex}
      >
        {Containers(items)}
      </Page>
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

  return (
    <Main darkMode={props.darkMode}>
      <div
        className={style.wrapper}
        onWheel={(e: MainWheelEvent): void => handleScroll(e)}
      >
        {Pages}
      </div>
    </Main>
  )
}

export default Layout
