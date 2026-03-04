<template>
  <div
    class="markdown-content"
    v-html="markDownContent"
  ></div>
</template>

<script setup lang="ts">
import MarkdownIt from "markdown-it";

// 父子通信
const props = defineProps<{
  content: string;
}>();

// md 渲染器
const md = new MarkdownIt();

// 计算文本
const markDownContent = computed(() => {
  return props.content ? md.render(props.content) : "";
});
</script>

<style lang="less" scoped>
.markdown-content {
  line-height: 1.8;

  // 修复列表样式
  :deep(ul),
  :deep(ol) {
    list-style-position: inside;
    padding-left: 0;
    margin: 16px 0;
  }

  :deep(li) {
    margin: 8px 0;
  }
}
</style>
