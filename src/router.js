import Vue from 'vue'
import Router from 'vue-router'
// import axios from 'axios'

import {
  v1
} from '@/main'

// Video
// import VueVideoPlayer from 'vue-video-player'
// import 'video.js/dist/video-js.css'

// Routes
import Root from '@/views/root.route/root'
import Login from '@/views/login.route/login'
import SignUp from '@/views/signup.route/signup'
import Search from '@/views/search.route/search'

// Views
import DashboardView from '@/views/dashboard.view/dashboard'
import AdminView from '@/views/admin.view/admin'
import UserView from '@/views/user.view/user'
import SettingsView from '@/views/settings.view/settings'
import UploadView from '@/views/upload.view/upload'
import SearchView from '@/views/search.view/search'

// Errors
import NotFoundComponent from '@/views/404.error/404.error'

// axios.defaults.baseURL = 'https://archivio-fermi.herokuapp.com/'
// axios.defaults.withCredentials = true

Vue.use(Router)

const loadView = view => () => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`)

const auth = async (to, from, next) => {
  try {
    await v1.post('/users/me/logged', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    next()
  } catch (e) {
    next({
      path: '/home'
    })
  }
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/root',
    alias: '/',
    name: 'Root',
    component: Root,
    beforeEnter: auth,
    children: [{
      path: 'dashboard',
      name: 'DashboardView',
      component: DashboardView
    }, {
      path: 'admin',
      name: 'AdminView',
      component: AdminView
    }, {
      path: 'user',
      name: 'UserView',
      component: UserView
    }, {
      path: 'settings',
      name: 'SettingsView',
      component: SettingsView
    }, {
      path: 'upload',
      name: 'UploadView',
      component: UploadView
    }, {
      path: 'search',
      name: 'SearchView',
      component: SearchView
    }]
  }, {
    path: '/home',
    name: 'Home',
    component: loadView('home.route/home'),
    children: [{
      path: 'search',
      name: 'Search',
      component: Search
    }]
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '/logout',
    name: 'Logout',
    async beforeEnter (to, from, next) {
      localStorage.removeItem('token')
      let date = (new Date()).toUTCString()
      document.cookie = `token=; expires=${date}; path=/;`
      next()
    },
    redirect: { name: 'Home' }
  }, {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  }, {
    path: '*',
    component: NotFoundComponent
  }]
})
