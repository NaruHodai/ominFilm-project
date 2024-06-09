import { createRouter, createWebHistory } from "vue-router";
import Routes from "@/router/routes";

const router = createRouter({
    history: createWebHistory(""),
    routes: [    {
        path: "/",
        name: Routes.Main,
        component: () => import("@/views/MainView.vue"),
    },
        {
            path: "/detail/:photo",
            name: Routes.DetailPage,
            component: () => import("@/views/DetailPageView.vue"),
        },
        {
            path: "/admin",
            name: Routes.AdminPage,
            component: () => import("@/views/AdminPageView.vue"),
        },
    ],
});
export default router;
