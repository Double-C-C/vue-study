<template>
  <div class="layout">
    <aside class="layout-sidebar">
      <SideBar />
    </aside>
    <section class="layout-main">
      <main class="layout-content">
        <RouterView />
      </main>
    </section>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import SideBar from "@/components/sidebar/index.vue";
</script>

<style lang="less" scoped>
.layout {
  display: flex;
  height: 100vh;
  width: 100%;
  background-color: #ffffff;
}

.layout-sidebar {
  width: var(--sidebar-width);
  flex-shrink: 0;
  border-right: 1px solid #e1e4e8;
  transition: width 0.2s ease;
}

.layout-main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.layout-content {
  flex: 1;
  overflow: auto;
  padding: 16px;
  background-color: #ffffff;
}
</style>
