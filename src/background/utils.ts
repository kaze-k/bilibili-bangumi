/**
 * @description 工具类
 * @class Utils
 */
class Utils {
  /**
   * @description 当前设备的处理器数量
   * @private
   * @static
   * @readonly
   * @type {number}
   * @memberof Utils
   */
  public static readonly processors: number = navigator.hardwareConcurrency

  /**
   * 私有工具类构造方法
   * @private
   * @memberof Utils
   */
  private constructor() {}

  /**
   * @description 工作池
   * @static
   * @async
   * @template T
   * @param {Promise<T>[]} reqlist
   * @param {number} limit
   * @param {(result: PromiseFulfilledResult<T>[]) => void} callback
   * @return {*}  {Promise<void>}
   * @memberof Utils
   */
  public static async worker<T>(
    reqlist: Promise<T>[],
    limit: number,
    callback: (result: PromiseFulfilledResult<T>[]) => void,
  ): Promise<void> {
    const promises: Promise<any>[] = []
    // 创建工作池
    const pool = new Set()

    for (const req of reqlist) {
      if (pool.size >= limit) {
        await Promise.race(pool).catch((err: Error): Error => err)
      }

      // 删除已完成的请求
      const cb: () => void = (): void => {
        pool.delete(req)
      }
      req.then(cb, cb)

      pool.add(req)
      promises.push(req)
    }

    // 执行工作
    await Promise.allSettled(promises).then(callback, callback)
  }
}

export default Utils
