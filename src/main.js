import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

// CUSTOM
import socketio from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'
import axios from 'axios'

Vue.config.productionTip = false

export const SocketInstance = socketio('/', { secure: true, rejectUnauthorized: false, transports: ['websocket', 'flashsocket', 'polling'] })

const env = process.env.NODE_ENV

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
    },
    push (message, body) {
      if (!('Notification' in window)) { // Verifica se il browser supporta le notifiche
        alert('This browser does not support desktop notification')
      } else if (Notification.permission === 'granted') { // Verifica che ci siano i permessi per le notifiche
        /* eslint no-unused-vars: "off" */
        let notification = new Notification(message, {
          body,
          icon: '/shortcut/android-chrome-512x512.png'
        })
      } else if (Notification.permission !== 'denied') { // Altrimenti chiede il permesso
        Notification.requestPermission((permission) => {
          if (permission === 'granted') { // Se l'utente accetta
            /* eslint no-unused-vars: "off" */
            let notification = new Notification(message, {
              body,
              icon: '/shortcut/android-chrome-512x512.png'
            })
          }
        })
      }
    }
  }
})

const host = {
  heroku: 'https://archivio-fermi.herokuapp.com/',
  remote: 'https://archivio.riccardosangiorgio.com',
  local: 'http://localhost:3000'
}

let path

if (env !== 'production') {
  path = host.local
} else {
  path = host.remote
}

export const v1 = axios.create({
  baseURL: `${path}/api/v1`,
  withCredentials: true,
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
})

export const service = axios.create({
  baseURL: `${path}`,
  withCredentials: true,
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
})

Vue.use(VueSocketIO, SocketInstance)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
