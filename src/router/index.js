import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Privacy from '../views/Privacy.vue'
import Therms from '../views/Therms.vue'
import Dashboard from '../views/Dashboard.vue'
import { storage } from '../services/storage'
import store from '../store'
Vue.use(VueRouter)

const routes = [
  {
      path: '/',
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
  },
  {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach(
  (to, from, next) => {
    const anyRoute = ['Privacy', 'Therms', 'Home']
    const isLogged = store.state.user|| storage.get('isLogged') === 'true'
    if(!isLogged) {
      if(!anyRoute.includes(to.name)) {
        next('/')
      }
      else {
        next()
      }
    }
    else {
      if(to.name == 'Home') {
        next('/dashboard')
      }
      else {
        next()
      }
    }
})
export default router
