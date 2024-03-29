module.exports = {
  browser_specific_settings: {
    gecko: {
      id: "addon@kaze.cn",
      strict_min_version: "101.0",
    },
  },
  description: "bilibili动漫时间表",
  icons: {
    16: "icons/icon16.png",
    32: "icons/icon32.png",
    48: "icons/icon48.png",
    64: "icons/icon64.png",
    128: "icons/icon128.png",
  },
  action: {
    default_icon: {
      16: "icons/icon16.png",
      32: "icons/icon32.png",
      48: "icons/icon48.png",
      64: "icons/icon64.png",
      128: "icons/icon128.png",
    },
    default_popup: "popup.html",
  },
  permissions: ["storage", "notifications", "alarms"],
  default_locale: "zh_CN",
  host_permissions: ["https://*/*", "http://*/*"],
}
