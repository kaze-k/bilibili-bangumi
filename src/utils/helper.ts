import { PersistKey } from "~/store/enums"

/**
 * @description 获取本地存储设置的值
 * @async
 * @template T
 * @param {Exclude<PersistKey, PersistKey.PREFIX>} storageKey 存储值的键名
 * @param {string} name 存储对象中的属性名
 * @return {*}  {Promise<T>} 返回本地存储设置的值
 */
async function settings<T extends boolean | number | string>(
  storageKey: Exclude<PersistKey, PersistKey.PREFIX>,
  name: string,
): Promise<T> {
  const key = `${PersistKey.PREFIX}${storageKey}`
  const syncStorage: object = await chrome.storage.sync.get(key)

  if (syncStorage[key]) {
    const parsed: object = JSON.parse(syncStorage[key], (_key: string, value: unknown): unknown => {
      if (typeof value === "string") {
        const parsedValue: unknown = JSON.parse(value)
        return parsedValue
      }

      return value
    })

    const result: T = parsed[name]

    return result
  }
}

export { settings }
