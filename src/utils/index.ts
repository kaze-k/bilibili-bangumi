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
 * @description 拼接URL
 * @param {Params} params URL参数
 * @param {string} params.baseURL 接口地址
 * @param {string} param.url 接口路径
 * @param {TimelineParams | Info} param.query 接口参数 [可选]
 * @return {*}  {string} 返回拼接后的URL
 */
function joinUrl(params: Params): string {
  const { baseURL, url, query } = params

  let fullParams: string
  fullParams = ""

  for (const i in query) {
    fullParams += `${i}=${query[i]}&`
  }
  fullParams = fullParams.substring(0, fullParams.length - 1)

  const fullURL = `${baseURL}/${url}?${fullParams}`

  return fullURL
}

/**
 * @description 格式化数量大小
 * @param {number} num 初始的数量大小
 * @return {*}  {string} 返回格式化后的数量大小
 */
function formatNum(num: number): string {
  if (typeof num !== "number") {
    return
  }

  if (10000 * 10000 > num && num >= 10000) {
    const formatted_num: string = (num / 10000).toFixed(1)
    return `${formatted_num}万`
  } else if (num >= 10000 * 10000) {
    const formatted_num: string = (num / 10000 / 10000).toFixed(1)
    return `${formatted_num}亿`
  } else {
    return `${num}`
  }
}

/**
 * @description 格式化整点时间
 * @param {number} time 时间戳
 * @return {*}  {string} 返回格式化后的时间
 */
function formatTime(time: number): string {
  return `${time}:00`
}

/**
 * @description 将剧集类别从英文的转为中文
 * @param {string} style 剧集类别
 * @return {*}  {string} 转换后的中文剧集类别
 */
function toChineseStyle(style: Style): ToChineseStyleReturn {
  switch (style) {
    case "all":
      return "全部"

    case "anime":
      return "番剧"

    case "guochuang":
      return "国创"
  }
}

/**
 * @description 获取同步存储的值
 * @param {string} storageKey 存储值的键名
 * @param {string} [name=storageKey] 存储对象中的属性名[默认与storageKey的值相同] [可选]
 * @return {*}  {Promise<boolean>} 返回布尔值
 */
async function settings<T extends boolean | number | string>(
  storageKey: string,
  name: string = storageKey,
): Promise<T> {
  const syncStorage: Storages = await chrome.storage.sync.get("persist:syncStorage")

  if (syncStorage["persist:syncStorage"]) {
    const rootParsed: {} = JSON.parse(syncStorage["persist:syncStorage"])
    const parsed: {} = JSON.parse(rootParsed[`${storageKey}`])

    const result: T = parsed[String(name)]

    return result
  }
}

/**
 * @description 转换时间戳
 * @param {number} time 时间戳
 * @param {ToTimeOpt} [opt="m"] 转换的时间单位[默认是分钟] [可选]
 * @return {*}  {number} 返回时间
 */
function toTime(time: number, opt: ToTimeOpt = "m"): number {
  let result: number
  switch (opt) {
    case "ms":
      result = time
      break

    case "s":
      result = time / 1000
      break

    case "m":
      result = time / 1000 / 60
      break

    case "h":
      result = time / 1000 / 60 / 60
      break

    default:
      result = time / 1000
  }

  return result
}

export { toChineseDay, formatSize, joinUrl, formatNum, formatTime, toChineseStyle, settings, toTime }
