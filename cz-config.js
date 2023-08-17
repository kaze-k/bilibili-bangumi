// see https://github.com/leoforfree/cz-customizable

module.exports = {
  // commit类型
  types: [
    { value: "init", name: "init:        初始化" },
    { value: "update", name: "update:      更新" },
    { value: "feat", name: "feat:        新增功能" },
    { value: "fix", name: "fix:         修复" },
    { value: "docs", name: "docs:        文档变更" },
    { value: "style", name: "style:       代码格式化" },
    { value: "refactor", name: "refactor:    代码重构" },
    { value: "perf", name: "perf:        性能优化" },
    { value: "ci", name: "ci:          修改项目配置文件" },
    { value: "test", name: "test:        添加测试" },
    { value: "chore", name: "chore:       变更构建流程或辅助工具" },
    { value: "revert", name: "revert:      代码回退" },
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
    { name: "popup" },
    { name: "routes" },
    { name: "service" },
    { name: "store" },
    { name: "utils" },
    { name: "views" },
    { name: "locales" },
    { name: "pubilc" },
    { name: "tools" },
  ], // 指定修改范围
  usePreparedCommit: false, // 重用旧commit
  allowCustomScopes: true, // 允许自定义范围
  skipQuestions: ["body", "footer"], // 跳过的问题
  subjectLimit: 100, // 主题限制
};
