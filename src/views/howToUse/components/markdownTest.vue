<template>
  <MarkdownFrame :content="content" />
</template>
<script setup lang="ts">
const content = ref<string>(`
# 标题
这是一段文字
- list1
- list2`);
</script>
