# 手把手教你实现 Markdown 渲染器

## 💡 学习目标

通过本教程，你将学会：

1. 如何集成 markdown-it 库
2. 如何配置代码高亮
3. 如何创建可复用的 Vue 组件
4. 如何实现高级功能（目录、字数统计等）

---

## 第一步：理解核心原理 (5分钟)

### Markdown 渲染的基本流程

```
Markdown 文本 → markdown-it 解析 → HTML → 浏览器渲染
```

### 需要的核心库

- **markdown-it**: 将 Markdown 转换为 HTML
- **highlight.js**: 为代码块添加语法高亮

### 已安装的依赖

```bash
pnpm add markdown-it @types/markdown-it highlight.js
```

---

## 第二步：创建最简单的渲染器 (10分钟)

### 任务：创建 SimpleMarkdown.vue

在 `src/components/` 目录下创建一个新文件 `SimpleMarkdown.vue`

#### 步骤 1：模板部分

```vue
<template>
  <!-- v-html 用于渲染 HTML 字符串 -->
  <div
    class="markdown-content"
    v-html="html"
  ></div>
</template>
```

**知识点**：

- `v-html` 指令可以将字符串作为 HTML 渲染
- 要小心 XSS 攻击，只渲染可信内容

#### 步骤 2：脚本部分

```vue
<script setup lang="ts">
import { ref, computed } from "vue";
import MarkdownIt from "markdown-it";

// 1. 定义 props（组件的输入）
interface Props {
  content: string; // 要渲染的 Markdown 文本
}
const props = defineProps<Props>();

// 2. 创建 markdown-it 实例
const md = new MarkdownIt();

// 3. 使用计算属性转换 Markdown
const html = computed(() => {
  return md.render(props.content);
});
</script>
```

**知识点**：

- `computed` 会在 `props.content` 变化时自动重新计算
- `md.render()` 是核心方法，将 Markdown 转为 HTML

#### 步骤 3：样式部分

```vue
<style scoped lang="scss">
.markdown-content {
  padding: 20px;
  line-height: 1.8;

  // 使用 :deep() 可以影响 v-html 渲染的内容
  :deep(h1) {
    font-size: 2em;
    font-weight: 600;
    margin: 1em 0 0.5em;
  }

  :deep(p) {
    margin: 1em 0;
  }

  :deep(code) {
    background-color: #f5f5f5;
    padding: 2px 6px;
    border-radius: 3px;
  }
}
</style>
```

**知识点**：

- `scoped` 样式默认不影响子组件内容
- `:deep()` 可以穿透 scoped 限制，设置动态内容样式

### 测试你的组件

在任意页面中使用：

```vue
<template>
  <SimpleMarkdown :content="markdown" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import SimpleMarkdown from "@/components/SimpleMarkdown.vue";

const markdown = ref(`
# 我的第一个 Markdown

这是**粗体**，这是*斜体*。

- 列表项 1
- 列表项 2
`);
</script>
```

**🎯 练习**：

1. 创建 `SimpleMarkdown.vue` 文件
2. 复制上面的代码
3. 在一个页面中测试它
4. 尝试修改 markdown 内容，看看效果

---

## 第三步：添加代码高亮 (15分钟)

### 为什么需要代码高亮？

没有高亮的代码：

```
function hello() {
  console.log('hello')
}
```

有高亮的代码：看起来像在 IDE 中一样，不同语法用不同颜色

### 任务：升级你的组件

#### 步骤 1：导入 highlight.js

```typescript
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css"; // 选择一个主题
```

**可选主题**：

- `github.css` - GitHub 风格（浅色）
- `github-dark.css` - GitHub 暗色
- `monokai.css` - Monokai 编辑器风格
- `atom-one-dark.css` - Atom 编辑器暗色

#### 步骤 2：配置 markdown-it

```typescript
const md = new MarkdownIt({
  // 启用这些选项
  linkify: true, // 自动将 URL 转为链接
  typographer: true, // 智能排版（如 ... 转为 …）

  // 重点：代码高亮配置
  highlight: (str: string, lang: string) => {
    // 如果指定了语言且 highlight.js 支持
    if (lang && hljs.getLanguage(lang)) {
      try {
        // 高亮代码
        const highlighted = hljs.highlight(str, {
          language: lang,
          ignoreIllegals: true,
        }).value;

        // 包裹在 <pre> 和 <code> 标签中
        return `<pre class="hljs"><code>${highlighted}</code></pre>`;
      } catch (e) {
        console.error("高亮失败:", e);
      }
    }

    // 如果不支持，返回普通代码块
    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
  },
});
```

**知识点**：

- `highlight` 是一个回调函数，处理每个代码块
- `lang` 是代码块的语言（如 \`\`\`javascript）
- `hljs.getLanguage()` 检查是否支持该语言
- `md.utils.escapeHtml()` 防止 XSS 攻击

#### 步骤 3：更新样式

```scss
:deep(pre) {
  background-color: #282c34;
  border-radius: 6px;
  padding: 16px;
  overflow-x: auto; // 代码过长时可以横向滚动

  code {
    color: #abb2bf;
    font-family: "Consolas", "Monaco", monospace;
    font-size: 0.9em;
  }
}
```

**🎯 练习**：

1. 更新你的 `SimpleMarkdown.vue`
2. 测试不同语言的代码块：

   ```vue
   const markdown = ref(` ### JavaScript \`\`\`javascript const hello = () =>
   console.log('Hello') \`\`\` ### Python \`\`\`python def hello():
   print('Hello') \`\`\` `)
   ```

3. 尝试切换不同的高亮主题

---

## 第四步：创建生产级组件 (20分钟)

### 添加更多配置选项

```typescript
interface Props {
  content: string;
  highlight?: boolean; // 可以关闭高亮
  html?: boolean; // 是否允许 HTML 标签
}

const props = withDefaults(defineProps<Props>(), {
  content: "",
  highlight: true,
  html: false, // 默认禁用 HTML（安全）
});
```

### 添加完整样式

参考我创建的 `MarkdownRenderer.vue` 中的样式部分，包含：

- 标题样式（h1-h6）
- 列表样式（ul, ol）
- 表格样式（table）
- 引用块样式（blockquote）
- 链接样式（a）

**🎯 练习**：

1. 逐个添加样式，每添加一个就测试效果
2. 尝试自定义颜色和间距
3. 测试响应式效果（缩小浏览器窗口）

---

## 第五步：实现文件加载功能 (20分钟)

### 创建 useMarkdown Composable

Composable 是 Vue 3 的代码复用方式

在 `src/composables/useMarkdown.ts` 创建：

```typescript
import { ref, type Ref } from "vue";

export function useMarkdown() {
  // 响应式状态
  const content: Ref<string> = ref("");
  const loading: Ref<boolean> = ref(false);
  const error: Ref<Error | null> = ref(null);

  // 从 URL 加载文件
  const loadFromUrl = async (url: string) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`加载失败: ${response.statusText}`);
      }
      content.value = await response.text();
    } catch (e) {
      error.value = e as Error;
    } finally {
      loading.value = false;
    }
  };

  return {
    content,
    loading,
    error,
    loadFromUrl,
  };
}
```

**知识点**：

- Composable 就是一个返回响应式状态和方法的函数
- 使用 `Ref` 类型声明响应式变量
- `async/await` 处理异步请求

### 使用你的 Composable

```vue
<script setup lang="ts">
import { onMounted } from "vue";
import { useMarkdown } from "@/composables/useMarkdown";

const { content, loading, error, loadFromUrl } = useMarkdown();

onMounted(() => {
  loadFromUrl("/guide.md");
});
</script>

<template>
  <div v-if="loading">加载中...</div>
  <div v-else-if="error">错误: {{ error.message }}</div>
  <SimpleMarkdown
    v-else
    :content="content"
  />
</template>
```

**🎯 练习**：

1. 创建 `useMarkdown.ts`
2. 在 `public/` 目录放一个 `.md` 文件
3. 使用 composable 加载并显示它

---

## 第六步：添加目录功能 (30分钟)

### 原理

1. 用正则表达式提取所有标题
2. 为每个标题生成唯一 ID
3. 渲染目录列表
4. 点击时滚动到对应标题

### 提取标题的工具函数

```typescript
export const markdownUtils = {
  extractHeadings(markdown: string) {
    // 匹配 # ## ### 等标题
    const regex = /^(#{1,6})\s+(.+)$/gm;
    const headings = [];
    let match;

    while ((match = regex.exec(markdown)) !== null) {
      const level = match[1].length; // # 的数量
      const text = match[2].trim(); // 标题文字

      // 生成 ID（小写，空格变横线）
      const id = text
        .toLowerCase()
        .replace(/[^\w\u4e00-\u9fa5]+/g, "-")
        .replace(/^-|-$/g, "");

      headings.push({ level, text, id });
    }

    return headings;
  },
};
```

**知识点**：

- 正则表达式 `^(#{1,6})\s+(.+)$` 匹配 Markdown 标题
- `gm` 标志：g=全局匹配，m=多行模式
- `\u4e00-\u9fa5` 匹配中文字符

### 实现滚动功能

```typescript
const scrollTo = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth", // 平滑滚动
      block: "start", // 滚动到顶部
    });
  }
};
```

**🎯 练习**：

1. 实现 `extractHeadings` 函数
2. 在组件中调用并显示标题列表
3. 给每个标题添加点击事件
4. 测试滚动功能

---

## 第七步：性能优化和最佳实践 (20分钟)

### 1. 使用 computed 而不是 methods

❌ 不好：

```typescript
const getHtml = () => md.render(props.content);
```

✅ 好：

```typescript
const html = computed(() => md.render(props.content));
```

**原因**：computed 有缓存，只在依赖变化时重新计算

### 2. 大文档的懒加载

```typescript
const loadLargeDoc = async () => {
  // 先显示加载状态
  loading.value = true;

  // 使用 setTimeout 让 UI 有机会更新
  setTimeout(async () => {
    await loadFromUrl("/large-doc.md");
    loading.value = false;
  }, 0);
};
```

### 3. 防止 XSS 攻击

```typescript
const md = new MarkdownIt({
  html: false, // 禁止原始 HTML
});
```

**🎯 练习**：

1. 测试渲染一个大文档（>100KB）的性能
2. 添加加载动画
3. 测试安全性（尝试在 Markdown 中插入 `<script>` 标签）

---

## 进阶挑战 🚀

完成上面的步骤后，尝试这些挑战：

### 挑战 1：搜索功能

- 添加搜索框
- 高亮搜索结果
- 跳转到匹配位置

### 挑战 2：编辑器

- 左边编辑，右边实时预览
- 保存到 localStorage
- 导出为 .md 文件

### 挑战 3：主题切换

- 实现明暗主题切换
- 保存用户偏好
- CSS 变量实现

### 挑战 4：插件系统

- 集成 emoji 插件
- 添加数学公式支持（KaTeX）
- 实现流程图（Mermaid）

---

## 学习资源 📚

- [markdown-it 文档](https://markdown-it.github.io/)
- [highlight.js 文档](https://highlightjs.org/)
- [Vue 3 组合式 API](https://cn.vuejs.org/guide/extras/composition-api-faq.html)
- [正则表达式教程](https://regexr.com/)

---

## 检查清单 ✅

- [ ] 创建了基础的 Markdown 渲染组件
- [ ] 添加了代码高亮功能
- [ ] 实现了文件加载
- [ ] 提取标题生成目录
- [ ] 添加了样式美化
- [ ] 理解了性能优化要点
- [ ] 完成了至少一个进阶挑战

---

## 下一步

现在你已经学会了核心概念！参考我创建的完整组件：

- `MarkdownRenderer.vue` - 看看生产级代码是什么样的
- `MarkdownViewer.vue` - 学习如何组合多个功能
- `useMarkdown.ts` - 研究更多工具函数

记住：**看懂别人的代码** 也是学习的重要部分！

---

💡 **提示**：遇到问题时：

1. 查看浏览器控制台的错误信息
2. 用 `console.log()` 调试
3. 阅读库的官方文档
4. 逐步实现，不要一次写太多
