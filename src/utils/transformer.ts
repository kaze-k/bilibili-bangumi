import { EpisodeType } from "~/store/enums"

import { ToChineseTypeReturn, ToTimeOpt } from "./enums"

/**
 * @description 格式化存储大小
 * @param {number} size 初始的存储大小(单位: B)
 * @return {*}  {string} 返回格式化后的存储大小
 */
function formatSize(size: number): string {
  if (1024 > size && size >= 0) {
    return `${size} B`
  } else if (1024 * 1024 > size && size >= 1024) {
    return `${(size / 1024).toFixed(2)} KB`
  } else {
    return `${(size / 1024 / 1024).toFixed(2)} MB`
  }
}

/**
 * @description 格式化数量大小
 * @param {number} num 初始的数量大小
 * @return {*}  {string} 返回格式化后的数量大小
 */
function formatNum(num: number): string {
  if (typeof num === "undefined") {
    return
  }

  if (isNaN(num)) {
    return
  }

  if (10000 * 10000 > num && num >= 10000) {
    const result: number = num / 10000
    const formatted_num: string = Number.isInteger(result) ? String(result) : result.toFixed(1)

    return `${formatted_num}万`
  } else if (num >= 10000 * 10000) {
    const result: number = num / 10000 / 10000
    const formatted_num: string = Number.isInteger(result) ? String(result) : result.toFixed(1)

    return `${formatted_num}亿`
  } else {
    return `${num}`
  }
}

/**
 * @description 将数字星期日期表示转为中文星期日期表示
 * @param {number} day 数字星期日期
 * @return {*}  {string} 返回中文星期日期
 */
function toChineseDay(day: number): string {
  const week: string[] = ["一", "二", "三", "四", "五", "六", "日"]
  return week[day - 1]
}

/**
 * @description 将剧集类别从英文的转为中文
 * @param {EpisodeType} type 剧集类别
 * @return {*}  {ToChineseTypeReturn} 转换后的中文剧集类别
 */
function toChineseType(type: EpisodeType): ToChineseTypeReturn {
  switch (type) {
    case EpisodeType.ALL:
      return ToChineseTypeReturn.ALL

    case EpisodeType.ANIME:
      return ToChineseTypeReturn.ANIME

    case EpisodeType.GUOCHUANG:
      return ToChineseTypeReturn.GUOCHUANG

    default:
      return ToChineseTypeReturn.DEFAULT
  }
}

/**
 * @description 转换时间戳
 * @param {number} time 时间戳
 * @param {ToTimeOpt} [opt=ToTimeOpt.M] 转换的时间单位[默认是分钟] [可选]
 * @return {*}  {number} 返回时间
 */
function toTime(time: number, opt: ToTimeOpt = ToTimeOpt.M): number {
  let result: number
  switch (opt) {
    case ToTimeOpt.MS:
      result = time
      break

    case ToTimeOpt.S:
      result = time / 1000
      break

    case ToTimeOpt.M:
      result = time / 1000 / 60
      break

    case ToTimeOpt.H:
      result = time / 1000 / 60 / 60
      break

    default:
      result = time / 1000
  }

  return result
}

export { formatSize, formatNum, toChineseDay, toChineseType, toTime }
