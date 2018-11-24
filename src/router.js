import Vue from 'vue'
import Router from 'vue-router'

import {
  v1
  // nprogress
} from '@/main'

// Routes
import Root from '@/routes/root.route/root'
import Login from '@/routes/login.route/login'
import SignUp from '@/routes/signup.route/signup'

// Views
import DashboardView from '@/views/dashboard.root.view/dashboard'
import AdminView from '@/views/admin.root.view/admin'
import UserView from '@/views/user.root.view/user'
import SettingsView from '@/views/settings.root.view/settings'
import UploadView from '@/views/upload.root.view/upload'
import SearchView from '@/views/search.root.view/search'

import LandingHomeView from '@/views/landing.home.view/landing'
import SearchHomeView from '@/views/search.home.view/search'

// Errors
import NotFoundComponent from '@/routes/404.error.route/404'

// Video
// import VueVideoPlayer from 'vue-video-player'
// import 'video.js/dist/video-js.css'

// axios.defaults.baseURL = 'https://archivio-fermi.herokuapp.com/'
// axios.defaults.withCredentials = true

Vue.use(Router)

const loadView = view => () => import(/* webpackChunkName: "view-[request]" */ `@/routes/${view}.vue`)

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

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/root',
    alias: '/',
    name: loadView('root.route/root'),
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
    }, {
      path: '/logout',
      name: 'Logout',
      async beforeEnter (to, from, next) {
        localStorage.removeItem('token')
        // let date = (new Date()).toUTCString()
        // document.cookie = `token=; expires=${date}; path=/;`
        next({ name: 'Landing' })
      }
    }]
  }, {
    path: '/home',
    component: loadView('home.route/home'),
    children: [{
      path: '',
      name: 'Landing',
      component: LandingHomeView
    }, {
      path: 'search',
      name: 'Search',
      component: SearchHomeView
    }]
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  }, {
    path: '/files/:id',
    name: 'Files',
    component: loadView('files.route/files')
  }, {
    path: '*',
    component: NotFoundComponent
  }]
})
//
// router.beforeResolve((to, from, next) => {
//   // If this isn't an initial page load.
//   if (to.name) {
//     // Start the route progress bar.
//     nprogress.start()
//   }
//   next()
// })
//
// router.afterEach((to, from) => {
//   // Complete the animation of the route progress bar.
//   nprogress.done()
// })

export default router
