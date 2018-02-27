// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';
import App from './App';
import router from './router';


export const SocketInstance = socketio('http://localhost:3000');

export const eventBus = new Vue({
  methods: {
    documentDeleted() {
      this.$emit("documentDeleted");
    },
    collectionDeleted() {
      this.$emit("collectionDeleted");
    },
    uploading(progress) {
      this.$emit("uploading", progress);
    }
  }
});

Vue.use(VueSocketIO, SocketInstance)
Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  template: "<App/>",
  components: {
    App
  },
  // render: h => h(App)
});