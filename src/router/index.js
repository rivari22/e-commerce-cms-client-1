import Vue from 'vue'
import VueRouter from 'vue-router'
import Admin from '../views/Admin.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (!localStorage.access_token) return next()
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    beforeEnter: (to, from, next) => {
      if (localStorage.access_token) return next()
    },
    children: [
      {
        path: 'products',
        component: () => import(/* webpackChunkName: "about" */ '../components/Products.vue')
      },
      {
        path: 'orders',
        component: () => import(/* webpackChunkName: "about" */ '../components/Orders.vue')
      },
      {
        path: 'products/edit/:id',
        component: () => import(/* webpackChunkName: "about" */ '../components/EditProduct.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
