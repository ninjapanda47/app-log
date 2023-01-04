import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/reports",
      name: "Report",
      component: () => import("../views/ReportsView.vue"),
    },
    {
      path: "/application-log",
      name: "Application-Log",
      component: () => import("../views/ApplicationLogView.vue"),
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/Login.vue")
    },
    {
      path: "/sign-in",
      name: "Sign-In",
      component: () => import("../views/SignIn.vue")
    }
  ],
});

export default router;
