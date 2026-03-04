<template>
  <div class="not-found">
    <h1>404</h1>
    <p>页面不存在</p>

    <RouterLink to="/">返回首页</RouterLink>
  </div>
</template>
<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<style scoped>
.not-found {
  height: 100%;
  display: grid;
  place-content: center;
  gap: 8px;
}
</style>
