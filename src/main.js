import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

// CUSTOM
import socketio from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'
// import axios from 'axios'

Vue.config.productionTip = false

export const SocketInstance = socketio('/', {secure: true, rejectUnauthorized: false, transports: ['websocket', 'flashsocket', 'polling']})

export const eventBus = new Vue({
  methods: {
    openPopUp (entity, component, width) {
      this.$emit('openPopUp', entity, component, width)
    },
    closePopUp () {
      this.$emit('closePopUp')
    },
    uploading (progress) {
      this.$emit('uploading', progress)
    },
    notification (notification) {
      this.$emit('notification', notification)
    }
  }
})

// // axios.defaults.baseURL = 'http://localhost:3000'
// axios.defaults.withCredentials = true

Vue.use(VueSocketIO, SocketInstance)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
