import type { RouteLocationRaw } from "vue-router";
import {
  Edit,
  DocumentCopy,
  Setting,
  User,
  QuestionFilled,
  Files,
  Document,
} from "@element-plus/icons-vue";
import type { Component } from "vue";

export interface NavItem {
  id: string; // id
  label: string; // 页面标签
  icon?: Component; // 页面icon
  router?: RouteLocationRaw; // 页面router
  disabled?: boolean; // 菜单项是否启用
  children?: NavItem[]; // router的子router
  isGroup?: boolean; // 菜单项是否是组属性(可展开)
}

export const navItems: NavItem[] = [
  {
    id: "home",
    label: "首页",
    icon: Edit,
    router: "/",
  },
  {
    id: "howToUse",
    label: "如何使用",
    icon: QuestionFilled,
    isGroup: true,
    router: "/guide",
    children: [
      {
        id: "2-1",
        label: "Markdown测试",
        icon: Document,
        router: "markdown-test",
      },
      {
        id: "categories",
        label: "分类管理",
        icon: Files,
        router: "categories",
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
    id: "markdownExample",
    label: "Markdown 完整示例",
    icon: Document,
    router: "/markdown-example",
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
];
