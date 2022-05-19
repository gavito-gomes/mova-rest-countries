import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetailsView from '../views/DetailsView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    props: true,
  },
  {
    path: '/details/:code',
    name: 'details',
    component: DetailsView,
    props: true,
  },
]

const router = new VueRouter({
  routes,
})

export default router
