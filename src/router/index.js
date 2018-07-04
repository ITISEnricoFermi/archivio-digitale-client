import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'

// Video
// import VueVideoPlayer from 'vue-video-player'
// import 'video.js/dist/video-js.css'

// Routes
import Root from '@/components/root.route/root'
import Home from '@/components/home.route/home'
import Login from '@/components/login.route/login'
import SignUp from '@/components/signup.route/signup'
import Search from '@/components/search.route/search'

// Errors
import NotFoundComponent from '@/components/404.error/404.error'

Vue.use(Router)
// Vue.use(VueVideoPlayer)

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
  }, {
    path: '/search',
    name: 'Search',
    component: Search
  }, {
    path: '*',
    component: NotFoundComponent
  }]
})
