// github: https://github.com/conventional-changelog/commitlint
// options: https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-rules.md
import { UserConfig } from "@commitlint/types"

const Configuration: UserConfig = {
  // 继承的规则
  extends: ["@commitlint/config-conventional"],
  // 规则
  rules: {
    // 提交类型范围
    "type-enum": [
      2,
      "always",
      [
        "update", // 更新
        "feat", // 新功能
        "fix", // 修复
        "docs", // 文档变更
        "style", // 代码格式
        "refactor", // 代码重构
        "perf", // 优化
        "ci", // 持续集成
        "test", // 测试用例
        "chore", // 构建过程、依赖或辅助工具
        "revert", // 代码回退
        "merge", // 合并分支
        "build", // 构建
        "WIP", // 尚未完成
      ],
    ],
    // 主题大小写
    "subject-case": [0],
    // 类型大小写
    "type-case": [0],
    // 范围大小写
    "scope-case": [0],
    // header大小写
    "header-case": [0],
    // body大小写
    "body-case": [0],
  },
}

export default Configuration
