import { createRouter, createWebHistory } from "vue-router";
import { isAuthenticated } from "../guards";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/admin",
    },
    {
      path: "/admin",
      component: () => import("../layouts/admin/MainLayout.vue"),
      beforeEnter: isAuthenticated("admin-login"),
      children: [
        {
          path: "",
          name: "admin-login",
          component: () => import("../pages/admin/LoginPage.vue"),
        },
        {
          path: "home",
          name: "admin-home",
          meta: {
            requiresAuth: true,
          },
          component: () => import("../pages/admin/HomePage.vue"),
        },
      ],
    },
  ],
});

export default router;
