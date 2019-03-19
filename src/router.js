import Vue from 'vue'
import Router from 'vue-router'
import v1 from '@/utils/v1'

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

Vue.use(Router)

const loadView = view => () => import(`@/routes/${view}.vue`)

const auth = async (to, from, next) => {
  try {
    if (!localStorage.getItem('id')) {
      throw new Error('Non si detengono i privilegi necessari.')
    }
    await v1.get('/users/' + localStorage.getItem('id'))
    if (to.name === 'Root' || to.name === 'Home' || to.name === 'Login' || to.name === 'SignUp') {
      next({
        path: '/dashboard/'
      })
    } else {
      next()
    }
  } catch (e) {
    if (to.name === 'Login' || to.name === 'SignUp' || to.name === 'Home' || to.name === 'Search') {
      next()
    } else {
      next({
        path: '/home/'
      })
    }
  }
}

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    name: 'Root',
    component: loadView('root.route/root'),
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
      path: '/user/:id',
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
      beforeEnter (to, from, next) {
        localStorage.clear()
        // let date = (new Date()).toUTCString()
        // document.cookie = `token=; expires=${date}; path=/;`
        next('/home/')
      }
    }]
  }, {
    path: '/home',
    component: loadView('home.route/home'),
    beforeEnter: auth,
    children: [{
      path: '',
      name: 'Home',
      component: LandingHomeView
    }, {
      path: 'search',
      name: 'Search',
      component: SearchHomeView
    }]
  }, {
    path: '/login',
    name: 'Login',
    component: loadView('login.route/login'),
    beforeEnter: auth
  }, {
    path: '/signup',
    name: 'SignUp',
    component: loadView('signup.route/signup'),
    beforeEnter: auth
  }, {
    path: '/files/:id',
    name: 'Files',
    component: loadView('files.route/files')
  }, {
    path: '*',
    component: NotFoundComponent
  }]
})

router.afterEach((to, from) => {
  document.title = to.meta.title || 'Archivio Digitale - ITIS Enrico Fermi'
})

export default router
