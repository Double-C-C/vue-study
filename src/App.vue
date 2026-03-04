<template>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<style lang="less">
:root {
  --sidebar-width: 264px;
  --header-height: 56px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  width: 100%;
}

#app {
  height: 100%;
  width: 100%;
  background-color: #ffffff;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica,
    Arial, sans-serif;
  font-size: 14px;
  line-height: 1.5;
}
</style>
