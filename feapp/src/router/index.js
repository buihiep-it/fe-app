import Vue from 'vue'
import VueRouter from 'vue-router'
// import WebStorageService from '@/services/web-storage.service'
// import { WebStorageKey } from '@/globals/enums'
// import Login from '@/views/Login.vue'
// import Main from '@/views/Main.vue'
// import Index from '@/views/main/Index.vue'
// import Profile from '@/views/Profile.vue'
import Covid from '@/views/Covid.vue'

Vue.use(VueRouter)
// const webStorageService = new WebStorageService()

const routes = [
    {
        path: '*',
        name: 'covid',
        component: Covid
    },
    {
        path: '/',
        name: 'covid',
        component: Covid
    },
    {
        path: '/covid',
        name: 'covid',
        component: Covid
    }
    // {
    //     path: '/login',
    //     name: 'login',
    //     component: Login
    // }
    // {
    //     path: '/main',
    //     name: 'main',
    //     component: Main,
    //     children: [
    //         {
    //             path: '',
    //             redirect: { name: 'index' }
    //         },
    //         {
    //             path: 'index',
    //             name: 'index',
    //             component: Index,
    //             meta: { requiredLogin: true }
    //         },
    //         {
    //             path: 'profile',
    //             name: 'profile',
    //             component: Profile,
    //             meta: { requiredLogin: true }
    //         }
    //     ]
    // }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

// router.beforeEach((to, from, next) => {
//     const token = webStorageService.getSessionStorage(WebStorageKey.Token)
//     if (!token) {
//         if (to.meta && to.meta.requiredLogin === true) {
//             webStorageService.setLocalStorage(WebStorageKey.NextAfterLogin, to.path)
//             return next({ name: 'login' })
//         }
//     }
//     return next()
// })

export default router