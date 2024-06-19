// see https://github.com/leoforfree/cz-customizable

module.exports = {
  // commit类型
  types: [
    { value: "update", name: "update:      更新" },
    { value: "feat", name: "feat:        新功能" },
    { value: "fix", name: "fix:         修复BUG" },
    { value: "docs", name: "docs:        文档变更" },
    { value: "style", name: "style:       代码格式" },
    { value: "refactor", name: "refactor:    代码重构" },
    { value: "perf", name: "perf:        优化" },
    { value: "ci", name: "ci:          持续集成" },
    { value: "test", name: "test:        测试用例" },
    { value: "chore", name: "chore:       构建过程、依赖或辅助工具" },
    { value: "revert", name: "revert:      代码回退" },
    { value: "merge", name: "merge:       合并分支" },
    { value: "build", name: "build:       构建" },
    { value: "WIP", name: "WIP:         尚未完成" },
  ],

  // 消息提示
  messages: {
    type: "请选择提交类型:",
    scope: "请输入修改范围(可选):",
    customScope: "自定义修改范围(可选):",
    subject: "请简要描述提交(必选):",
    body: "请输入详细描述(可选):",
    breaking: "请输入重大修改(可选):",
    footer: "请输入要关闭的issue(可选):",
    confirmCommit: "确定要使用上面的信息提交吗?(Y/n/e/h):",
  },

  // 配置选项
  allowBreakingChanges: ["feat", "fix"], // 允许破坏性修改
  scopes: [
    { name: "assets" },
    { name: "background" },
    { name: "components" },
    { name: "options" },
    { name: "panel" },
    { name: "popup" },
    { name: "router" },
    { name: "service" },
    { name: "locales" },
    { name: "pubilc" },
    { name: "tools" },
    { name: "release" },
    { name: "changelog" },
  ], // 指定修改范围
  usePreparedCommit: false, // 重用旧commit
  allowCustomScopes: true, // 允许自定义范围
  skipQuestions: ["body", "footer"], // 跳过的问题
  subjectLimit: 100, // 主题限制
}
