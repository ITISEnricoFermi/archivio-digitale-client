<template>
<main class="panel panel__admin">
  <app-signup-requests></app-signup-requests>
  <app-create-account :privileges="privileges" :subjects="subjects" @alert="userAlert = $event"></app-create-account>
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

import axios from 'axios'

import signupRequests from './signupRequests.vue'
import createAccount from './createAccount.vue'
import searchUsers from './searchUsers.vue'
import User from '@/components/user/user'
import Alert from '@/components/alert/alert'

export default {
  props: ['privileges'],
  data: () => {
    return {
      subjects: [],
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
  created () {
    axios.get('/api/getSubjects/')
      .then((response) => {
        this.subjects = response.data
      }).catch((e) => {
        this.userAlert = {
          messages: e.response.data.messages,
          color: 'alert--red'
        }
      })
  },
  components: {
    appSignupRequests: signupRequests,
    appCreateAccount: createAccount,
    appSearchUsers: searchUsers,
    appUser: User,
    appAlert: Alert
  }
}
</script>

<style scoped lang="scss">

</style>
