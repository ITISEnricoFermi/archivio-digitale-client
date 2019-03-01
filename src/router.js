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

// Home
import LandingHomeView from '@/views/home/landing/landing'
import SearchHomeView from '@/views/home/search/search'

// Dashboard
import DashboardView from '@/views/root/dashboard/dashboard'

// Admin
import SendMailAdminView from '@/views/root/admin/send.mails/send.mails'
import CreateUserAdminView from '@/views/root/admin/users/create/create'
import SearchUsersAdminView from '@/views/root/admin/users/search/search'
import ServicesAdminView from '@/views/root/admin/services/services'

// Search
import DocumentsSearchView from '@/views/root/search/documents/documents'
import CollectionsSearchView from '@/views/root/search/collections/collections'

// Create
import DocumentsCreateView from '@/views/root/create/documents/documents'
import CollectionsCreateView from '@/views/root/create/collections/collections'

import SettingsView from '@/views/root/settings/settings'
import UserView from '@/views/root/user/user'

// Errors
import NotFoundComponent from '@/routes/404.error.route/404'

// Video
// import VueVideoPlayer from 'vue-video-player'
// import 'video.js/dist/video-js.css'

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
      path: '/admin/users/create/',
      name: 'CreateUserAdminView',
      component: CreateUserAdminView
    }, {
      path: '/admin/users/search/',
      name: 'SearchUsersAdminView',
      component: SearchUsersAdminView
    }, {
      path: '/admin/sendmail/',
      name: 'SendMailAdminView',
      component: SendMailAdminView
    }, {
      path: '/admin/services/',
      name: 'ServicesAdminView',
      component: ServicesAdminView
    }, {
      path: 'settings',
      name: 'SettingsView',
      component: SettingsView
    }, {
      path: 'user',
      name: 'UserView',
      component: UserView
    }, {
      path: '/create/documents/',
      name: 'DocumentsCreateView',
      component: DocumentsCreateView
    }, {
      path: '/create/collections/',
      name: 'CollectionsCreateView',
      component: CollectionsCreateView
    }, {
      path: '/search/documents/',
      name: 'DocumentsSearchView',
      component: DocumentsSearchView
    }, {
      path: '/search/collections/',
      name: 'CollectionsSearchView',
      component: CollectionsSearchView
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
