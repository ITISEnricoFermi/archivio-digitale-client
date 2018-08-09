import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'

// Video
// import VueVideoPlayer from 'vue-video-player'
// import 'video.js/dist/video-js.css'

// Routes
import Root from '@/views/root.route/root'
import Home from '@/views/home.route/home'
import Login from '@/views/login.route/login'
import SignUp from '@/views/signup.route/signup'
import Search from '@/views/search.route/search'

// Errors
import NotFoundComponent from '@/views/404.error/404.error'

axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.withCredentials = true

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    name: 'Root',
    component: Root,
    async beforeEnter (to, from, next) {
      try {
        const response = await axios.post('/users/me/logged')
        console.log(response)
        next()
      } catch (e) {
        console.log(e)
        next({
          path: '/home'
        })
      }
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
