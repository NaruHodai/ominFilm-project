import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(""),
    routes: [    {
        path: "/",
        name: "main",
        component: () => import("@/components/MainView.vue"),
    },
        {
            path: "/detail/:photo",
            name: "detailPage",
            component: () => import("@/components/DetailPageView.vue"),
        },
    ],
});
export default router;
