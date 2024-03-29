import service from "~/service"

/**
 * @description 获取剧集信息的接口
 * @param {Info} params 接口参数
 * @param {number} param.season_id 剧集id
 * @return {*}  {Promise<APIResponse>} 返回接口获取的剧集信息
 */
function getInfo(params: Info): ServiceReturn {
  return service({
    method: "GET",
    mode: "cors",
    url: "pgc/view/web/season",
    query: params,
  })
}

export default getInfo
