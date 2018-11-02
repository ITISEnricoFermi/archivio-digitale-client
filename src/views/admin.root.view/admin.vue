<template>
<main class="panel">
  <app-settings></app-settings>
  <app-signup-requests></app-signup-requests>
  <app-add-users :privileges="privileges" :subjects="subjects" @alert="userAlert = $event"></app-add-users>
  <transition name="fade">
    <app-alert v-if="userAlert.messages" :alert="userAlert" @alert="userAlert = $event"></app-alert>
  </transition>
  <app-search-users @searchUsers="users  = $event" @alert="searchUsersAlert = $event"></app-search-users>
  <transition name="fade">
    <app-alert v-if="!users" :alert="searchUsersAlert" @alert="searchUsersAlert = $event"></app-alert>
  </transition>
  <transition-group name="fade" mode="out-in">
    <app-user v-if="users" v-for="(user, index) in users" :user="user" :key="index"></app-user>
  </transition-group>
</main>
</template>

<script>

import signupRequests from './components/signupRequests'
import AddUsers from './components/users.add'
import SearchUsers from './components/users.search'
import Settings from './components/app.settings'
import User from '@/components/user/user'
import Alert from '@/components/alert/alert'

export default {
  props: ['privileges', 'subjects'],
  data: () => {
    return {
      users: [],
      userAlert: {
        messages: undefined,
        color: undefined
      },
      searchUsersAlert: {
        messages: undefined,
        color: undefined
      }
    }
  },
  components: {
    appSignupRequests: signupRequests,
    appAddUsers: AddUsers,
    appSearchUsers: SearchUsers,
    appSettings: Settings,
    appUser: User,
    appAlert: Alert
  }
}
</script>

<style scoped lang="scss">
  .panel {
    padding: 3vh;
  }
</style>
