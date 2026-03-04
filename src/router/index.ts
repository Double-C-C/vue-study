import {
  createRouter,
  createWebHistory,
  RouterView,
  type RouteRecordRaw,
} from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/views/layout/index.vue"),
    children: [
      {
        path: "",
        redirect: "/guide/markdown-test",
      },
      {
        path: "guide",
        name: "指南",
        component: RouterView,
        children: [
          {
            path: "markdown-test",
            name: "MarkDown测试文本",
            component: () => import("@/views/howToUse/index.vue"),
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
