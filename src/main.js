import Vue from 'vue'
import socketio from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'
import VueLazyload from 'vue-lazyload'
import NProgress from 'vue-nprogress'

// Vue
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

// Imports
import { nprogress } from './utils/v1'

// Exports
export * from './utils/eventBus'
export * from './utils/v1'
export * from './utils/service'

Vue.config.productionTip = false

Vue.use(new VueSocketIO({
  debug: false,
  connection: socketio('/', {
    secure: true,
    rejectUnauthorized: false,
    transports: ['websocket', 'flashsocket', 'polling']
  })
}))

Vue.use(VueLazyload)
Vue.use(NProgress)

new Vue({
  router,
  store,
  nprogress,
  render: h => h(App)
}).$mount('#app')
