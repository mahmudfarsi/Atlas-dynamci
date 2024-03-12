import { createRouter,createWebHistory } from "vue-router";

export default createRouter({
    history:createWebHistory(),
    routes : [
        {
            path:'/',
            name:'home',
            component:import('@/pages/Index.vue')
        },
        {
            path:'/About',
            component:import('@/pages/About.vue')
        },
        {
            name:'country-id',
            path:'/country/:id',
            component:import('@/pages/CountryInfo.vue')
        },
        {
            name:'404',
            path: '/:pathMatch(.*)*',
            component: import('@/pages/404.vue')
        }
    ]
})