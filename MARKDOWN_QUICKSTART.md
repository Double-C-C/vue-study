# Markdown 渲染功能 - 快速开始

## 🚀 快速安装

```bash
# 安装必需依赖
pnpm add markdown-it @types/markdown-it highlight.js @types/highlight.js
```

## 📁 已创建的文件

### 组件

- ✅ `src/components/MarkdownRenderer.vue` - 基础渲染器
- ✅ `src/components/MarkdownViewer.vue` - 高级查看器(带目录)

### 工具

- ✅ `src/composables/useMarkdown.ts` - 组合式函数和工具

### 示例页面

- ✅ `src/views/MarkdownDemo.vue` - 基础演示
- ✅ `src/views/MarkdownExample.vue` - 完整功能示例

### 示例文档

- ✅ `public/guide.md` - 示例文档

### 文档

- ✅ `MARKDOWN_GUIDE.md` - 完整使用指南

## 🎯 路由配置

路由已自动添加到 `router/index.ts`:

- `/markdown-demo` - 基础演示
- `/markdown-example` - 完整示例

## 📌 侧边栏菜单

菜单项已添加到 `sidebar.ts`:

- "Markdown 演示"
- "Markdown 完整示例"

## 💡 快速使用

### 方式一:基础渲染

```vue
<template>
  <MarkdownRenderer :content="markdown" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import MarkdownRenderer from "@/components/MarkdownRenderer.vue";

const markdown = ref("# Hello Markdown");
</script>
```

### 方式二:从文件加载

```vue
<template>
  <MarkdownViewer url="/guide.md" />
</template>

<script setup lang="ts">
import MarkdownViewer from "@/components/MarkdownViewer.vue";
</script>
```

### 方式三:使用 Composable

```vue
<script setup lang="ts">
import { useMarkdown } from "@/composables/useMarkdown";

const { content, loading, loadFromUrl } = useMarkdown();
await loadFromUrl("/docs/api.md");
</script>
```

## 🎨 代码高亮主题

默认使用 `github-dark` 主题,可在 `MarkdownRenderer.vue` 中更换:

```typescript
// 其他可选主题:
import "highlight.js/styles/github.css";
import "highlight.js/styles/monokai.css";
import "highlight.js/styles/atom-one-dark.css";
```

## 📚 查看示例

启动开发服务器后访问:

1. http://localhost:5173/markdown-demo
2. http://localhost:5173/markdown-example

或点击侧边栏的"Markdown 演示"和"Markdown 完整示例"菜单。

## 🔧 自定义配置

### 修改样式

编辑 `MarkdownRenderer.vue` 的 `<style>` 部分

### 添加插件

可以添加 markdown-it 插件扩展功能:

- `markdown-it-emoji` - Emoji 支持
- `markdown-it-katex` - 数学公式
- `markdown-it-footnote` - 脚注
- `markdown-it-anchor` - 标题锚点

## ❓ 常见问题

**Q: 如何加载本地 Markdown 文件?**  
A: 将文件放在 `public` 目录,使用 `<MarkdownViewer url="/file.md" />`

**Q: 如何自定义代码高亮样式?**  
A: 更改 `MarkdownRenderer.vue` 中的 highlight.js 主题导入

**Q: 如何显示/隐藏目录?**  
A: 使用 `<MarkdownViewer :show-toc="false" />`

## 📖 完整文档

查看 `MARKDOWN_GUIDE.md` 获取详细文档和高级用法。

---

🎉 现在你可以在 Vue 项目中使用 Markdown 渲染功能了!
