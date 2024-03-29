import service from "~/service"

/**
 * @description 获取时间表的接口
 * @param {TimelineParams} params 接口参数
 * @param {number} param.types 类别
 * @param {number} param.before 开始的天数 [可选]
 * @param {number} param.after 结束的天数 [可选]
 * @return {*}  {Promise<APIResponse>} 返回接口获取的时间表信息
 */
function getTimeline(params: TimelineParams): ServiceReturn {
  return service({
    method: "GET",
    mode: "cors",
    url: "pgc/web/timeline",
    query: params,
  })
}

export default getTimeline
