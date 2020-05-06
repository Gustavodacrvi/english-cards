import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Privacy from '../views/Privacy.vue'
import Therms from '../views/Therms.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '*',
        name: 'Home',
        component: Home
    },
    {
        path: '/therms',
        name: 'Therms',
        component: Therms
    },
    {
        path: '/privacy',
        name: 'Privacy',
        component: Privacy
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
