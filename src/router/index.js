import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'

import Root from '@/components/root.route/root'
import Home from '@/components/home.route/home'
import Login from '@/components/login.route/login'
import SignUp from '@/components/signup.route/signup'

import NotFoundComponent from '@/components/404.error/404.error'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'Root',
    component: Root,
    beforeEnter: (to, from, next) => {
      axios.post('/users/me/logged')
        .then((response) => next())
        .catch((e) => next({
          path: '/home'
        }))
    }
  }, {
    path: '/home',
    name: 'Home',
    component: Home
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '*',
    component: NotFoundComponent
  }
  ]
})
