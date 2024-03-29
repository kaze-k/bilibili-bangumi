module.exports = {
  description: "__MSG_Description__",
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
  side_panel: {
    default_path: "CHANGELOG.html",
  },
  options_page: "CHANGELOG.html",
  permissions: ["storage", "notifications", "alarms", "sidePanel"],
  default_locale: "zh_CN",
  host_permissions: ["https://*/*", "http://*/*"],
}
