<template>
<main class="panel panel__admin">
  <app-signup-requests></app-signup-requests>
  <app-create-account :privileges="privileges" :subjects="subjects" @alert="userAlert = $event"></app-create-account>
  <transition name="fade">
    <app-alert v-if="userAlert.message" :alert="userAlert" @alert="userAlert = $event"></app-alert>
  </transition>
  <app-search-users  @searchUsers="users  = $event" @alert="searchUsersAlert = $event"></app-search-users>
  <transition name="fade">
    <app-alert v-if="searchUsersAlert.message" :alert="searchUsersAlert" @alert="searchUsersAlert = $event"></app-alert>
  </transition>
  <app-user v-if="users" v-for="(user, index) in users" :user="user" :key="user._id"></app-user>
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
        message: undefined,
        color: undefined
      },
      searchUsersAlert: {
        message: undefined,
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
          message: e.response.data,
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
