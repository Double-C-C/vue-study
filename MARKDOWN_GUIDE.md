# Markdown 渲染功能使用指南

## 概述

本项目已集成 Markdown 渲染功能,支持在 Vue 页面中嵌入和渲染 Markdown 文档。

## 功能特性

✅ **基础渲染** - 支持标准 Markdown 语法  
✅ **代码高亮** - 使用 highlight.js 实现多语言代码高亮  
✅ **自动目录** - 自动提取标题生成可点击目录  
✅ **文档信息** - 显示字数统计和预计阅读时间  
✅ **响应式设计** - 适配各种屏幕尺寸  
✅ **实时编辑** - 支持编辑预览功能  
✅ **文件加载** - 可从 URL 加载 Markdown 文件

## 安装依赖

```bash
pnpm add markdown-it @types/markdown-it highlight.js @types/highlight.js
```

## 组件说明

### 1. MarkdownRenderer (基础渲染器)

位置: `src/components/MarkdownRenderer.vue`

**Props:**

- `content` (string): Markdown 源文本
- `highlight` (boolean): 是否启用代码高亮,默认 true
- `html` (boolean): 是否允许 HTML 标签,默认 false

**基础用法:**

```vue
<template>
  <MarkdownRenderer :content="markdownText" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import MarkdownRenderer from "@/components/MarkdownRenderer.vue";

const markdownText = ref(`
# 标题
这是一段**粗体**文字。
`);
</script>
```

### 2. MarkdownViewer (高级查看器)

位置: `src/components/MarkdownViewer.vue`

**Props:**

- `url` (string): Markdown 文件 URL
- `modelValue` (string): 直接传入的 Markdown 内容
- `showToc` (boolean): 是否显示目录,默认 true
- `showInfo` (boolean): 是否显示文档信息,默认 true

**从文件加载:**

```vue
<template>
  <MarkdownViewer url="/guide.md" />
</template>
```

**直接传入内容:**

```vue
<template>
  <MarkdownViewer :model-value="content" />
</template>

<script setup lang="ts">
import { ref } from "vue";

const content = ref("# Hello World");
</script>
```

### 3. useMarkdown (组合式函数)

位置: `src/composables/useMarkdown.ts`

**返回值:**

- `content` - Markdown 内容(响应式)
- `loading` - 加载状态
- `error` - 错误信息
- `loadFromUrl()` - 从 URL 加载文件
- `setContent()` - 设置内容
- `clear()` - 清空内容

**使用示例:**

```typescript
import { useMarkdown } from "@/composables/useMarkdown";

const { content, loading, error, loadFromUrl } = useMarkdown();

// 加载文件
await loadFromUrl("/path/to/file.md");
```

## 工具函数

### markdownUtils

位置: `src/composables/useMarkdown.ts`

```typescript
import { markdownUtils } from "@/composables/useMarkdown";

// 提取标题(生成目录)
const headings = markdownUtils.extractHeadings(markdown);

// 统计字数
const wordCount = markdownUtils.countWords(markdown);

// 估算阅读时间(分钟)
const readingTime = markdownUtils.estimateReadingTime(markdown);
```

## 示例页面

项目包含两个示例页面:

1. **MarkdownDemo** (`/markdown-demo`) - 基础演示
2. **MarkdownExample** (`/markdown-example`) - 完整功能示例

## 样式定制

### 修改代码高亮主题

在 `MarkdownRenderer.vue` 中修改导入:

```typescript
// 可选主题:
import "highlight.js/styles/github.css"; // GitHub 风格
import "highlight.js/styles/monokai.css"; // Monokai
import "highlight.js/styles/atom-one-dark.css"; // Atom One Dark
import "highlight.js/styles/vs2015.css"; // Visual Studio 2015
```

### 自定义 Markdown 样式

修改 `MarkdownRenderer.vue` 中的 `<style>` 部分:

```scss
.markdown-renderer {
  // 修改文字颜色
  color: #333;

  // 修改标题样式
  :deep(h1) {
    color: #000;
    font-size: 2em;
  }

  // 修改链接颜色
  :deep(a) {
    color: #409eff;
  }
}
```

## 高级用法

### 1. 编辑预览模式

```vue
<template>
  <div class="editor-layout">
    <el-input
      v-model="content"
      type="textarea"
      :rows="20"
    />
    <MarkdownRenderer :content="content" />
  </div>
</template>
```

### 2. 动态加载文档

```vue
<script setup lang="ts">
import { useMarkdown } from "@/composables/useMarkdown";

const { content, loading, loadFromUrl } = useMarkdown();

const loadDoc = async (docName: string) => {
  await loadFromUrl(`/docs/${docName}.md`);
};
</script>
```

### 3. 全屏文档查看器

```vue
<template>
  <el-dialog
    v-model="visible"
    fullscreen
    title="文档查看"
  >
    <MarkdownViewer :url="currentDoc" />
  </el-dialog>
</template>
```

## 最佳实践

1. **大型文档** - 使用 MarkdownViewer,启用目录导航
2. **实时编辑** - 使用 MarkdownRenderer 配合输入框
3. **静态文档** - 将 `.md` 文件放在 `public` 目录,使用 url 属性加载
4. **动态内容** - 使用 modelValue 或 content 属性传入

## 扩展功能

可以添加的增强功能:

- ✨ **LaTeX 数学公式** - 使用 `markdown-it-katex`
- ✨ **Emoji 支持** - 使用 `markdown-it-emoji`
- ✨ **脚注** - 使用 `markdown-it-footnote`
- ✨ **流程图** - 使用 `mermaid`
- ✨ **复制代码** - 添加复制按钮
- ✨ **全文搜索** - 实现文档内搜索

### 添加 Emoji 支持示例

```bash
pnpm add markdown-it-emoji
```

```typescript
import MarkdownIt from "markdown-it";
import emoji from "markdown-it-emoji";

const md = new MarkdownIt();
md.use(emoji);
```

## 故障排除

### 代码高亮不工作

- 检查是否正确安装 `highlight.js`
- 确认导入了样式文件
- 检查语言名称是否正确

### 目录不显示

- 确保 Markdown 中有标题
- 检查 `showToc` 是否为 true

### 样式不正确

- 检查 SCSS 是否正确配置
- 确认 Vue 项目支持 `<style scoped lang="scss">`

## 性能优化

1. **懒加载** - 大文档使用虚拟滚动
2. **缓存** - 缓存已加载的文档
3. **按需渲染** - 只渲染可见区域

## 更多资源

- [markdown-it 文档](https://github.com/markdown-it/markdown-it)
- [highlight.js 文档](https://highlightjs.org/)
- [Markdown 语法指南](https://www.markdownguide.org/)

---

有问题或建议? 欢迎提交 Issue 或 PR!
