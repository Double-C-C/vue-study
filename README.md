## 📌 项目概览

**技术栈**: Vue 3 + TypeScript + Vite + Element Plus + Pinia + Vue Router + Vue I18n + ECharts

---

## 📦 Git 协作流程

```bash
# 克隆仓库
git clone https://github.com/Double-C-C/vue-study
```

**分支说明**:

- `main` → 正式环境

**开发流程**:

```bash
# 1. 基于 main 创建功能分支
git checkout -b feature/your-feature-name

# 2. 开发并提交
git add .
git commit -m "feat: 添加 xxx 功能"
git push origin feature/your-feature-name

# 3. 提交 MR 到 main , 审查通过后将合并
```

基于githubAction配置CI流水线 , 仅做eslint + prettier代码检查

## ⚙️ 环境配置

### 1. 安装依赖

```bash
pnpm install
```

### 2. 运行项目

```bash
# 环境配置在.env.xxx下面
pnpm dev           # 使用测试环境接口（默认）
pnpm dev:test      # 使用测试环境接口
pnpm dev:prod      # 使用正式环境接口
```

访问地址: `http://localhost:8080/` 或 `http://127.0.0.1:8080/`

💡 **跨域处理**: 项目使用 Vite 代理自动处理跨域问题，无需配置虚拟域名

### 3. VSCode 插件（推荐）

项目已配置推荐插件列表（`.vscode/extensions.json`），首次打开项目时 VSCode 会提示安装：

- `Vue.volar` - Vue 3 语言支持
- `dbaeumer.vscode-eslint` - ESLint 代码检查
- `esbenp.prettier-vscode` - Prettier 代码格式化
- `Lokalise.i18n-ally` - 国际化辅助

⚠️ **注意**：

- 如果安装了 `octref.vetur` 需要禁用（与 Volar 冲突）
- 项目已配置保存时自动格式化（`.vscode/settings.json`）

---

## 📁 项目结构

```

```

---

## 📝 代码规范

### 命名规范

| 类型     | 规范              | 示例                             |
| -------- | ----------------- | -------------------------------- |
| 组件文件 | kebab-case        | `user-form.vue`                  |
| 组件名称 | PascalCase        | `UserForm`                       |
| 函数名称 | camelCase         | `getUserList`                    |
| 常量     | UPPER_SNAKE_CASE  | `API_BASE_URL`                   |
| CSS 类名 | kebab-case 或 BEM | `user-form` 或 `user-form__item` |

### TypeScript 规范

⚠️ **新增代码必须做好类型定义**

```typescript
// ❌ 不好
export function getUserList(params: any) { ... }

// ✅ 好
interface UserListParams {
  page: number;
  size: number;
}
export function getUserList(params: UserListParams) { ... }
```

### 代码格式化

#### 方式一：命令行格式化（推荐）

```bash
# 格式化所有文件
pnpm run lint            # ESLint 检查并自动修复
pnpm run lint:style      # Stylelint 检查并自动修复（如已配置）
pnpm run lint:all        # 同时运行 ESLint 和 Stylelint

# 使用 Prettier 格式化
npx prettier --write "src/**/*.{js,ts,tsx,vue,css,less,scss,html}"
```

#### 方式二：VSCode 快捷键格式化

1. **安装推荐插件**（项目已配置）：
   - `esbenp.prettier-vscode` - Prettier 格式化
   - `dbaeumer.vscode-eslint` - ESLint 检查
   - `stylelint.vscode-stylelint` - Stylelint 检查（如已配置）

2. **快捷键**：
   - Windows/Linux: `Shift + Alt + F`
   - macOS: `Shift + Option + F`

3. **保存时自动格式化**（项目已配置）：
   - 文件保存时会自动执行 ESLint 和 Prettier 格式化
   - 配置位置：`.vscode/settings.json`

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

### Git 提交规范

详情见文件`commitlint.config.cjs`

```js
// 提交规范
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
```

```
// 提交示范

fix(phaseCalendar): 修复了日历无法正常显示的问题

feat(minio-download): 新增minio下载判断模块

---
feat: 实现后端接口

- 做了111112222
- 做了2223333
```
