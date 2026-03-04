# Vue 3 项目开发指南

欢迎使用 Vue 3 + TypeScript + Vite 开发框架!

## 快速开始

### 安装依赖

\`\`\`bash
pnpm install
\`\`\`

### 启动开发服务器

\`\`\`bash
pnpm dev
\`\`\`

### 构建生产版本

\`\`\`bash
pnpm build
\`\`\`

## 项目结构

\`\`\`
src/
├── components/     # 可复用组件
├── views/          # 页面组件
├── router/         # 路由配置
├── stores/         # 状态管理
├── i18n/           # 国际化
├── styles/         # 全局样式
└── types/          # 类型定义
\`\`\`

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Vue | 3.5.26 | 渐进式 JavaScript 框架 |
| TypeScript | 5.9.3 | JavaScript 的超集 |
| Vite | 7.3.0 | 下一代前端构建工具 |
| Element Plus | 2.13.3 | Vue 3 组件库 |
| Pinia | 3.0.4 | Vue 状态管理 |
| Vue Router | 5.0.3 | 官方路由管理器 |

## 最佳实践

### 组件开发

使用 \`<script setup>\` 语法糖:

\`\`\`vue
<template>
  <div>{{ message }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const message = ref('Hello Vue 3!')
</script>
\`\`\`

### 类型安全

充分利用 TypeScript:

\`\`\`typescript
interface User {
  id: number
  name: string
  email?: string
}

const users: User[] = []
\`\`\`

### 状态管理

使用 Pinia store:

\`\`\`typescript
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    name: '',
    isLoggedIn: false
  }),
  actions: {
    login(name: string) {
      this.name = name
      this.isLoggedIn = true
    }
  }
})
\`\`\`

## 常用命令

- \`pnpm dev\` - 启动开发服务器
- \`pnpm build\` - 构建生产版本
- \`pnpm preview\` - 预览构建结果
- \`pnpm lint\` - 代码检查并修复
- \`pnpm format\` - 格式化代码

## 更多资源

- [Vue 3 文档](https://vuejs.org/)
- [TypeScript 文档](https://www.typescriptlang.org/)
- [Vite 文档](https://vitejs.dev/)
- [Element Plus 文档](https://element-plus.org/)
