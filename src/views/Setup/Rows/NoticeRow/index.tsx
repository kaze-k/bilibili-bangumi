import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import Row from "~/components/common/Row"
import Switch from "~/components/common/Switch"
import {
  disableAnimeNotice,
  disableGuoChuangNotice,
  disableNotice,
  enableAnimeNotice,
  enableGuoChuangNotice,
  enableNotice,
  toggleAnimeNotice,
  toggleAutoClear,
  toggleGuoChuangNotice,
  toggleNotice,
  toggleSilent,
} from "~/store/features/notice"
import { toTime } from "~/utils"

import style from "./style.module.scss"

/**
 * @description 番剧通知行组件
 * @param {DarkModeProps} props 深色主题Props [可选]
 * @return {*}  {React.ReactElement}
 */
function AnimeRow(props: DarkModeProps): React.ReactElement {
  const dispatch: Dispatch = useDispatch()

  const text = "番剧"

  // 状态
  const animeNotice: boolean = useSelector((state: State): boolean => state.notice.animeNotice)

  /**
   * @description 处理切换的方法: 切换番剧通知的开关
   */
  const handleSwitch: () => void = (): void => {
    dispatch(toggleAnimeNotice())
  }

  // 当番剧通知状态改变时: 切换番剧通知的开关
  useEffect((): void => {
    animeNotice ? dispatch(enableAnimeNotice()) : dispatch(disableAnimeNotice())
  }, [animeNotice])

  return (
    <div>
      <div className={style.container}>
        <Row
          text={text}
          darkMode={props.darkMode}
        >
          <Switch
            id="anime-notice-switch"
            onChange={handleSwitch}
            checked={animeNotice}
            darkMode={props.darkMode}
          />
        </Row>
      </div>
    </div>
  )
}

/**
 * @description 国创通知行组件
 * @param {DarkModeProps} props 深色主题Props [可选]
 * @return {*}  {React.ReactElement}
 */
function GuoChuangRow(props: DarkModeProps): React.ReactElement {
  const dispatch: Dispatch = useDispatch()

  const text = "国创"

  // 状态
  const guochuangNotice: boolean = useSelector((state: State): boolean => state.notice.guochuangNotice)

  /**
   * @description 处理切换的方法: 切换国创通知开关
   */
  const handleSwitch: () => void = (): void => {
    dispatch(toggleGuoChuangNotice())
  }

  // 当国创通知状态改变时: 切换国创通知的开关
  useEffect(() => {
    guochuangNotice ? dispatch(enableGuoChuangNotice()) : dispatch(disableGuoChuangNotice())
  }, [guochuangNotice])

  return (
    <div>
      <div className={style.container}>
        <Row
          text={text}
          darkMode={props.darkMode}
        >
          <Switch
            id="guochuang-notice-switch"
            onChange={handleSwitch}
            checked={guochuangNotice}
            darkMode={props.darkMode}
          />
        </Row>
      </div>
    </div>
  )
}

/**
 * @description 静默通知行组件
 * @param {DarkModeProps} props 深色主题Props [可选]
 * @return {*}  {React.ReactElement}
 */
function SilentRow(props: DarkModeProps): React.ReactElement {
  const dispatch: Dispatch = useDispatch()

  const text = "静默通知"
  const explain = "开启后，在通知显示时不发出声音或震动"

  // 状态
  const silent: boolean = useSelector((state: State): boolean => state.notice.silent)

  /**
   * @description 处理切换的方法: 切换静默通知开关
   */
  const handleSwitch: () => void = (): void => {
    dispatch(toggleSilent())
  }

  return (
    <div>
      <div className={style.container}>
        <Row
          title={explain}
          text={text}
          darkMode={props.darkMode}
        >
          <Switch
            id="silent-notice-switch"
            onChange={handleSwitch}
            checked={silent}
            darkMode={props.darkMode}
          />
        </Row>
      </div>
    </div>
  )
}

/**
 * @description 自动清除通知行组件
 * @param {DarkModeProps} props 深色主题Props [可选]
 * @return {*}  {React.ReactElement}
 */
function AutoCleanRow(props: DarkModeProps): React.ReactElement {
  const dispatch: Dispatch = useDispatch()

  // 状态
  const autoClear: boolean = useSelector((state: State): boolean => state.notice.autoClear)
  const timeout: number = useSelector((state: State): number => state.notice.timeout)

  const text = "自动清除通知"
  const explain = `开启后，通知信息会在${toTime(timeout)}分钟后自动清除`
  const tips = `通知信息会在${toTime(timeout)}分钟后自动清除`

  /**
   * @description 处理切换的方法: 切换自动清除通知开关
   */
  const handleSwitch: () => void = (): void => {
    dispatch(toggleAutoClear())
  }

  const tipsElement: React.ReactElement = <div className={style.tips}>{tips}</div>

  return (
    <div>
      <div className={style.container}>
        <Row
          title={explain}
          text={text}
          darkMode={props.darkMode}
        >
          <Switch
            id="auto-clean-notice-switch"
            onChange={handleSwitch}
            checked={autoClear}
            darkMode={props.darkMode}
          />
        </Row>
        {autoClear && tipsElement}
      </div>
    </div>
  )
}

/**
 * @description 追番行组件
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {React.ReactElement}
 */
function SubscribeRow(props: DarkModeProps): React.ReactElement {
  const dispatch: Dispatch = useDispatch()

  const text = "追番"

  // 状态
  const notice: boolean = useSelector((state: State): boolean => state.notice.notice)

  /**
   * @description 处理切换的方法: 切换追番通知开关
   */
  const handleSwitch: () => void = (): void => {
    dispatch(toggleNotice())
    notice ? dispatch(disableNotice()) : dispatch(enableNotice())
  }

  let showSilent: React.ReactElement,
    showAutoClean: React.ReactElement,
    showAnime: React.ReactElement,
    showGuoChuang: React.ReactElement
  if (notice) {
    showSilent = <SilentRow darkMode={props.darkMode} />
    showAutoClean = <AutoCleanRow darkMode={props.darkMode} />
    showAnime = <AnimeRow darkMode={props.darkMode} />
    showGuoChuang = <GuoChuangRow darkMode={props.darkMode} />
  }

  return (
    <div>
      <div className={style.container}>
        <Row
          text={text}
          darkMode={props.darkMode}
        >
          <Switch
            id="notice-switch"
            onChange={handleSwitch}
            checked={notice}
            darkMode={props.darkMode}
          />
        </Row>
      </div>
      {showAnime}
      {showGuoChuang}
      {showSilent}
      {showAutoClean}
    </div>
  )
}

/**
 * @description 通知行组件
 * @param {DarkModeProps} props 深色主题Props [可选]
 * @return {*}  {React.ReactElement}
 */
function NoticeRow(props: DarkModeProps): React.ReactElement {
  const dispatch: Dispatch = useDispatch()

  // 状态
  const notice: boolean = useSelector((state: State): boolean => state.notice.notice)
  const animeNotice: boolean = useSelector((state: State): boolean => state.notice.animeNotice)
  const guochuangNotice: boolean = useSelector((state: State): boolean => state.notice.guochuangNotice)

  const titleText = "通知"

  // 当番剧通知状态改变时/当国创通知状态改变时: 切换通知状态(番剧通知和国创通知都关闭时, 将通知关闭)
  useEffect(() => {
    if (notice && !animeNotice && !guochuangNotice) {
      dispatch(toggleNotice())
    }
  }, [animeNotice, guochuangNotice])

  return (
    <div className={style.wrapper}>
      <div className={style.title_text}>{titleText}</div>
      <SubscribeRow darkMode={props.darkMode} />
    </div>
  )
}

export default NoticeRow
