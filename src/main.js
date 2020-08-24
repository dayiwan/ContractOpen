import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VCharts from 'v-charts'

import router from './router'
import store from './store'
import mock from '@/mock';
import { getToken } from "@/utils/cookies.js";

Vue.use(Element)
Vue.use(VCharts)
Vue.config.productionTip = false


const routerWhiteList = ['/login'];


router.beforeEach((to, from, next) => {
    // 记录路由，登录后从哪来让他到哪去
    window.sessionStorage.formQuery = from.path
    if (routerWhiteList.indexOf(to.path) === -1) {
        if (getToken()) {
            next();
        } else {
            next({
                path: '/login'
            })
        }        
    } else {
        next();
    }
});


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')