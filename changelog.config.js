module.exports = {
  writerOpts: {
    transform: (commit, context) => {
      if (commit.type === "update") {
        commit.type = "更新"
      } else if (commit.type === "feat") {
        commit.type = "新增功能"
      } else if (commit.type === "fix") {
        commit.type = "修复"
      } else if (commit.type === "docs") {
        return
      } else if (commit.type === "style") {
        return
      } else if (commit.type === "refactor") {
        return
      } else if (commit.type === "perf") {
        commit.type = "性能优化"
      } else if (commit.type === "ci") {
        return
      } else if (commit.type === "test") {
        return
      } else if (commit.type === "chore") {
        return
      } else if (commit.type === "revert") {
        return
      } else if (commit.type === "build") {
        return
      } else if (commit.type === "WIP") {
        return
      } else {
        return
      }

      commit.scope = null

      commit.shortHash = typeof commit.hash === "string" ? commit.hash.substring(0, 7) : commit.shortHash

      return commit
    },
  },
}
