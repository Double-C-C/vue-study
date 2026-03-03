import type { RouteLocationRaw } from "vue-router";
import {
  Edit,
  DocumentCopy,
  Setting,
  User,
  QuestionFilled,
  Folder,
  Files,
  Document,
} from "@element-plus/icons-vue";
import type { Component } from "vue";

export interface NavItem {
  // 导航项ID
  id: string;
  // 显示标签
  label: string;
  // 图标组件（可选）
  icon?: Component;
  // 路由配置
  router?: RouteLocationRaw;
  // 是否禁用
  disabled?: boolean;
  // 子菜单（可选）
  children?: NavItem[];
  // 是否为分组（分组本身不含路由）
  isGroup?: boolean;
}

/**
 * 导航项配置列表
 */
export const navItems: NavItem[] = [
  {
    id: "home",
    label: "首页",
    icon: Edit,
    router: "/",
  },
  {
    id: "content-group",
    label: "内容管理",
    icon: Folder,
    isGroup: true,
    children: [
      {
        id: "articles",
        label: "文章管理",
        icon: Document,
        router: "/content/articles",
      },
      {
        id: "categories",
        label: "分类管理",
        icon: Files,
        router: "/content/categories",
      },
    ],
  },
  {
    id: "document",
    label: "文档",
    icon: DocumentCopy,
    router: "/document",
  },
  {
    id: "settings",
    label: "设置",
    icon: Setting,
    router: "/settings",
  },
  {
    id: "profile",
    label: "个人资料",
    icon: User,
    router: "/profile",
  },
  // 添加更多导航项...
];
