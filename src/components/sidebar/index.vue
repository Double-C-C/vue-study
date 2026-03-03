<template>
  <aside
    class="sidebar"
    :class="{ collapsed: isCollapsed }"
  >
    <div class="sidebar-header">
      <button
        @click="toggleCollapsed"
        :title="isCollapsed ? '展开' : '收缩'"
      >
        <el-icon><component :is="isCollapsed ? Expand : Fold" /></el-icon>
      </button>
    </div>
    <div class="sidebar-nav">
      <ul>
        <template
          v-for="item in navItems"
          :key="item.id"
        >
          <li
            v-if="item.isGroup"
            class="nav-group"
          >
            <a
              class="group-title"
              @click="toggleGroup(item.id)"
              href="#"
            >
              <el-icon v-if="item.icon"><component :is="item.icon" /></el-icon>
              <span class="label">{{ item.label }}</span>
              <el-icon
                class="expand-icon"
                :class="{ expanded: expandedGroups[item.id] }"
              >
                <CaretBottom />
              </el-icon>
            </a>
            <!-- 子菜单 -->
            <ul
              v-if="expandedGroups[item.id]"
              class="sub-nav"
            >
              <li
                v-for="child in item.children"
                :key="child.id"
                class="nav-item"
                :class="{ disabled: child.disabled }"
              >
                <a
                  :href="getRouterPath(child.router)"
                  @click="handleNavClick($event, child)"
                >
                  <el-icon><component :is="child.icon" /></el-icon>
                  <span class="label">{{ child.label }}</span>
                </a>
              </li>
            </ul>
          </li>

          <li
            v-else
            class="nav-item"
            :class="{ disabled: item.disabled }"
          >
            <a
              :href="getRouterPath(item.router)"
              @click="handleNavClick($event, item)"
            >
              <el-icon>
                <component :is="item.icon" />
              </el-icon>
              <span class="label">{{ item.label }}</span>
            </a>
          </li>
        </template>
      </ul>
    </div>
  </aside>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useRouter, type RouteLocationRaw } from "vue-router";
import { navItems, type NavItem } from "./sidebar";
import { CaretBottom, Expand, Fold } from "@element-plus/icons-vue";

const router = useRouter();
const isCollapsed = ref(false);
const expandedGroups = ref<Record<string, boolean>>({});

// 初始化分组展开状态
navItems.forEach((item) => {
  if (item.isGroup) {
    expandedGroups.value[item.id] = true;
  }
});

// 侧边栏是否收缩
function toggleCollapsed() {
  isCollapsed.value = !isCollapsed.value;
}

// 切换分组展开/折叠
function toggleGroup(groupId: string) {
  expandedGroups.value[groupId] = !expandedGroups.value[groupId];
}

// 处理导航点击
function handleNavClick(event: Event, item: NavItem) {
  event.preventDefault();

  if (item.disabled || !item.router) {
    return;
  }

  // 使用 router.push 进行导航
  router.push(item.router);
}

// 获取路由路径（用于href属性）
function getRouterPath(route?: RouteLocationRaw): string {
  if (!route) return "#";

  if (typeof route === "string") {
    return route;
  }

  if (typeof route === "object" && "path" in route) {
    return route.path || "#";
  }

  return "#";
}
</script>
<style lang="less" scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 264px;
  background: #0d1117;
  border-right: 1px solid #30363d;
  transition: width 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 100;

  // 收缩按钮样式
  .sidebar-header {
    padding: 16px;
    border-bottom: 1px solid #30363d;
    display: flex;
    justify-content: center;

    button {
      background: none;
      border: 1px solid #30363d;
      color: #c9d1d9;
      padding: 6px;
      border-radius: 6px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;

      &:hover {
        background: #161b22;
        border-color: #58a6ff;
        color: #58a6ff;
      }
    }
  }

  &.collapsed {
    width: 64px;

    .label {
      display: none;
    }

    .sidebar-header {
      button {
        width: 32px;
        height: 32px;
      }
    }
  }

  .sidebar-nav {
    flex: 1;
    padding: 8px 0;
    overflow-y: auto;
    overflow-x: hidden;

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .nav-group {
      .group-title {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 8px 12px;
        color: #c9d1d9;
        text-decoration: none;
        cursor: pointer;
        transition: all 0.2s ease;
        margin: 0 4px;
        border-radius: 4px;

        &:hover {
          background: #161b22;
          color: #fff;
        }

        .expand-icon {
          margin-left: auto;
          transition: transform 0.3s ease;
          transform: rotate(-90deg);

          &.expanded {
            transform: rotate(0deg);
          }
        }
      }

      .sub-nav {
        list-style: none;
        margin: 0;
        padding: 0;
        padding-left: 12px;
      }
    }

    .nav-item {
      a {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 8px 12px;
        color: #c9d1d9;
        text-decoration: none;
        cursor: pointer;
        transition: all 0.2s ease;

        margin: 0 4px;
        border-radius: 4px;

        &:hover {
          background: #161b22;
          color: #fff;
        }
      }

      .label {
        white-space: nowrap;
        font-size: 14px;
      }

      &.disabled {
        a {
          opacity: 0.5;
          cursor: not-allowed;
          pointer-events: none;
        }
      }
    }
  }

  // 滚动条美化
  .sidebar-nav::-webkit-scrollbar {
    width: 6px;
  }

  .sidebar-nav::-webkit-scrollbar-track {
    background: transparent;
  }

  .sidebar-nav::-webkit-scrollbar-thumb {
    background: #30363d;
    border-radius: 3px;

    &:hover {
      background: #484f58;
    }
  }
}
</style>
