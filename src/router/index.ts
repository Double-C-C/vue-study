import {
  createRouter,
  createWebHistory,
  RouterView,
  type RouteRecordRaw,
} from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/components/layout/index.vue"),
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
  // 404Not Found Page
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/components/layout/notFoundPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
