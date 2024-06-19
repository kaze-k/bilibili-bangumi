module.exports = {
  description: "__MSG_Description__",
  icons: {
    16: "icons/icon-16.png",
    32: "icons/icon-32.png",
    48: "icons/icon-48.png",
    64: "icons/icon-64.png",
    128: "icons/icon-128.png",
  },
  action: {
    default_icon: {
      16: "icons/icon-16.png",
      32: "icons/icon-32.png",
      48: "icons/icon-48.png",
      64: "icons/icon-64.png",
      128: "icons/icon-128.png",
    },
    default_popup: "popup.html",
  },
  side_panel: {
    default_path: "panel.html",
  },
  options_page: "options.html",
  permissions: ["storage", "notifications", "alarms", "sidePanel"],
  default_locale: "zh_CN",
  host_permissions: ["https://*/*", "http://*/*"],
}
