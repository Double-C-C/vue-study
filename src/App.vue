<template>
  <div class="app">
    <RouterView />
    <SideBar />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --color-canvas-default: #ffffff;
  --color-canvas-subtle: #f6f8fa;
}

.app {
  min-height: 100vh;
  background: var(--color-canvas-default);
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica,
    Arial, sans-serif;
  font-size: 14px;
  line-height: 1.5;
}
</style>
