module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // 新功能
        "ui", // UI变动
        "fix", // 修复bug
        "docs", // 文档变更
        "style", // 代码格式(不影响代码运行)
        "refactor", // 重构
        "perf", // 性能优化
        "test", // 测试
        "chore", // 构建过程或辅助工具的变动
        "revert", // 回退
        "build", // 打包
      ],
    ],
    "subject-case": [0], // 不限制主题大小写
  },
};
