<template>
  <header class="navbar">
    <div class="navbar-title">Markdown 学习笔记</div>
  </header>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.navbar {
  height: var(--header-height);
  display: flex;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid #e1e4e8;
  background: #ffffff;
}

.navbar-title {
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  letter-spacing: 0.2px;
}
</style>
