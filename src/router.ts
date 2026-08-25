import {createRouter, createWebHashHistory} from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'main',
            component: () => import("@/views/main-view.vue")
        },

        {
            path: '/settings',
            name: 'settings',
            component: () => import("@/views/setting-view.vue")
        }
    ]
})

export default router