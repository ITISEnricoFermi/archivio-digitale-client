// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import socketio from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'
import App from './App'
import router from './router'

export const SocketInstance = socketio(window.location.hostname, {secure: true})

export const eventBus = new Vue({
  methods: {
    editEntity (id, component) {
      this.$emit('editEntity', id, component)
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

Vue.use(VueSocketIO, SocketInstance)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
