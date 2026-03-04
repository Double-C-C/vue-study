<template>
  <aside
    class="sidebar"
    :class="{ collapsed: isCollapsed }"
  >
    <div class="sidebar-header">
      <div
        v-if="!isCollapsed"
        class="sidebar-title"
      >
        Markdown Notes
      </div>
      <button
        class="toggle-btn"
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
              <span
                v-if="!isCollapsed"
                class="label"
              >
                {{ item.label }}
              </span>
              <el-icon
                v-if="!isCollapsed"
                class="expand-icon"
                :class="{ expanded: expandedGroups[item.id] }"
              >
                <CaretBottom />
              </el-icon>
            </a>
            <!-- 子菜单 -->
            <ul
              v-if="!isCollapsed && expandedGroups[item.id]"
              class="sub-nav"
            >
              <li
                v-for="child in item.children"
                :key="child.id"
                class="nav-item"
                :class="{ disabled: child.disabled }"
              >
                <a
                  :href="getRouterPath(child, item)"
                  @click="handleNavClick($event, child, item)"
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
              :href="getRouterPath(item)"
              @click="handleNavClick($event, item)"
            >
              <el-icon>
                <component :is="item.icon" />
              </el-icon>
              <span
                v-if="!isCollapsed"
                class="label"
              >
                {{ item.label }}
              </span>
            </a>
          </li>
        </template>
      </ul>
    </div>
  </aside>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
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

// 初始化 CSS 变量
onMounted(() => {
  document.documentElement.style.setProperty("--sidebar-width", "264px");
});

// 侧边栏是否收缩
function toggleCollapsed() {
  isCollapsed.value = !isCollapsed.value;
  // 更新 CSS 变量，使 main 容器的 margin 自动跟随
  const width = isCollapsed.value ? "64px" : "264px";
  document.documentElement.style.setProperty("--sidebar-width", width);
}

// 切换分组展开/折叠
function toggleGroup(groupId: string) {
  expandedGroups.value[groupId] = !expandedGroups.value[groupId];
}

// 处理导航点击
function handleNavClick(event: Event, item: NavItem, parent?: NavItem) {
  event.preventDefault();

  if (item.disabled || !item.router) {
    return;
  }

  const target = getRouterTarget(item, parent);

  if (!target) {
    return;
  }

  // 使用 router.push 进行导航
  router.push(target);
}

// 获取最终路由
function getRouterTarget(item: NavItem, parent?: NavItem): string | undefined {
  const childPath = extractPath(item.router);
  if (!childPath) return undefined;

  return resolvePath(childPath, parent?.router);
}

// 获取路由路径（用于href属性）
function getRouterPath(item: NavItem, parent?: NavItem): string {
  const target = getRouterTarget(item, parent);
  if (!target) return "#";
  return target;
}

// 提取路径
function extractPath(route?: RouteLocationRaw): string {
  if (!route) return "";
  if (typeof route === "string") return route;

  if (typeof route === "object" && "path" in route) {
    return typeof route.path === "string" ? route.path : "";
  }

  return "";
}

function resolvePath(
  childPath: string,
  parentRoute?: RouteLocationRaw
): string {
  if (!childPath) return "#";

  if (childPath.startsWith("/")) return childPath;

  const basePath =
    typeof parentRoute === "string"
      ? parentRoute
      : parentRoute && typeof parentRoute === "object" && "path" in parentRoute
        ? parentRoute.path || ""
        : "";

  if (!basePath) return childPath;

  const normalizedBase = basePath.endsWith("/")
    ? basePath.slice(0, -1)
    : basePath;
  const normalizedChild = childPath.startsWith("/")
    ? childPath.slice(1)
    : childPath;
  return `${normalizedBase}/${normalizedChild}`;
}
</script>
<style lang="less" scoped>
.sidebar {
  position: relative;
  height: 100%;
  width: 100%;
  background: #ffffff;
  transition: width 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 10px;

  // 收缩按钮样式
  .sidebar-header {
    padding: 12px 16px;
    border-bottom: 1px solid #e1e4e8;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .sidebar-title {
      font-size: 14px;
      font-weight: 600;
      color: #2c3e50;
      letter-spacing: 0.2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .toggle-btn {
      background: none;
      border: 1px solid #d0d7de;
      color: #424242;
      width: 32px;
      height: 32px;
      padding: 0;
      border-radius: 6px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;

      &:hover {
        background: #f5f5f5;
        border-color: #1976d2;
        color: #1976d2;
      }
    }
  }

  &.collapsed {
    width: 64px;

    .sidebar-header {
      justify-content: center;
    }
  }

  .sidebar-nav {
    flex: 1;
    padding: 16px 0;
    overflow-y: auto;
    overflow-x: hidden;

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .nav-group {
      margin-bottom: 8px;

      .group-title {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 16px;
        color: #333333;
        font-weight: 600;
        font-size: 13px;
        text-decoration: none;
        cursor: pointer;
        transition: all 0.2s ease;
        text-transform: uppercase;
        letter-spacing: 0.5px;

        .el-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
        }

        &:hover {
          background: #f0f0f0;
          color: #1976d2;
        }

        .expand-icon {
          margin-left: auto;
          font-size: 14px;
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
        background-color: #fafafa;
      }
    }

    .nav-item {
      &:not(:last-child) {
        margin-bottom: 4px;
      }

      a {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 16px;
        color: #565656;
        text-decoration: none;
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 14px;

        .el-icon {
          font-size: 16px;
          flex-shrink: 0;
          color: #999999;
          transition: color 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        &:hover {
          background: #f0f0f0;
          color: #1976d2;

          .el-icon {
            color: #1976d2;
          }
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
    background: #d9d9d9;
    border-radius: 3px;

    &:hover {
      background: #bfbfbf;
    }
  }
}
</style>
