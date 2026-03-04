<script setup lang="ts">
import MarkdownTest from "./components/markdownTest.vue";
</script>

<template>
  <div class="howto">
    <header class="howto-header">
      <div class="howto-title">Markdown 学习笔记</div>
    </header>
    <div class="howto-content">
      <MarkdownTest />
    </div>
  </div>
</template>

<style lang="less" scoped>
.howto {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.howto-header {
  height: var(--header-height);
  display: flex;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid #e1e4e8;
  background: #ffffff;
}

.howto-title {
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  letter-spacing: 0.2px;
}

.howto-content {
  flex: 1;
  padding: 16px 0 0;
}
</style>
