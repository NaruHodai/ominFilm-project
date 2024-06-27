import { createRouter, createWebHistory } from "vue-router";
import Routes from "@/router/routes";
import { useAdminStore } from "@/store/admin"

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
        {
            path: "/login",
            name: Routes.LoginPage,
            component: () => import("@/views/LoginView.vue"),
        },
        {
            path: "/contentsInfo/:projectId",
            name: Routes.ContentsInfoPage,
            component: () => import("@/views/ContentsInfoView.vue"),
        },
        {
            path: "/add/contentsInfo",
            name: Routes.AddContentsInfoPage,
            component: () => import("@/views/AddContentsInfo.vue"),
        },
    ],
});

router.beforeEach((to, from, next) => {
    const adminStore = useAdminStore();

    if (to.path === '/admin' && !adminStore.signin) {
        next('/login');
    } else {
        next();
    }
});

export default router;
