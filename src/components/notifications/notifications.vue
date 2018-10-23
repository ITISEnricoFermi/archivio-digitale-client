<template>
<div class="notifications">
  <div class="content">
    <transition-group name="slide">
      <app-notification v-for="(notification, index) in notifications" :notification="notification" :key="index" @remove="remove($event)"></app-notification>
    </transition-group>
  </div>
</div>
</template>

<script>
import {
  eventBus
} from '@/main'

import Notification from './notification'

export default {
  name: 'notifications',
  data: () => {
    return {
      notifications: []
    }
  },
  created () {
    eventBus.$on('notification', (notification) => {
      const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
      notification.id = id
      this.notifications.push(notification)

      if (notification.temporary) {
        setTimeout(() => {
          this.remove(id)
        }, 4000)
      }

      if (this.notifications.length > 5) {
        this.notifications.splice(0, 1)
      }
    })
  },
  methods: {
    remove (id) {
      const index = this.notifications.findIndex(notification => notification.id === id)
      if (index > -1) {
        this.notifications.splice(index, 1)
      }
    }
  },
  components: {
    appNotification: Notification
  }
}
</script>

<style scoped="scoped" lang="scss">
.notifications {
    position: fixed;
    bottom: 0;
    left: 0;
    // height: 100vh;
    z-index: 100000;
    padding: 1vh;

    .content {
        position: relative;
        height: 100%;
        min-width: 30rem;
        display: flex;
        flex-direction: column-reverse;

        .notification:not(:last-child) {
            margin-bottom: 1vh;
        }
    }

}
</style>
