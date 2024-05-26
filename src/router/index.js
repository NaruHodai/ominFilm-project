import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(""),
    routes: [    {
        path: "/",
        name: "main",
        component: () => import("@/views/MainView.vue"),
    },
        {
            path: "/detail/:photo",
            name: "detailPage",
            component: () => import("@/views/DetailPageView.vue"),
        },
    ],
});
export default router;
