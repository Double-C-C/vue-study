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

没有配置CI/CD流水线 , 提交后会无事发生

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


```bash
#叽里咕噜说啥呢,我视察一下
# yes, this  is a shit obviously
```
