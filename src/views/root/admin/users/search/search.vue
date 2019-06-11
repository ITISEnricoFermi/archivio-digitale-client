<template>
<main>
  <div class="module module--padded">
    <div class="row">
      <div class="col-1-of-1">
        <input type="text" class="textfield" placeholder="Cerca utenti" autocomplete="off" v-model.trim="query" @keyup="search">
        <moon-loader :loading="true" :color="'#000'" :size="'20px'" v-if="loading"></moon-loader>
      </div>
    </div>
  </div>
  <transition name="fade" mode="out-in">
    <app-alert v-if="!users" :alert="searchUsersAlert" @alert="searchUsersAlert = $event"></app-alert>
  </transition>
  <transition-group name="fade" mode="out-in">
    <app-user v-for="user in users" :user="user" :key="user._id"></app-user>
  </transition-group>
</main>
</template>

<script>

import MoonLoader from 'vue-spinner/src/MoonLoader.vue'
import User from '@/components/user/user'
import Alert from '@/components/alert/alert'

import v1 from '@/utils/v1'

export default {
  data () {
    return {
      query: undefined,
      loading: false,
      users: [],
      searchUsersAlert: {
        messages: undefined,
        color: undefined
      }
    }
  },
  sockets: {
    userDeleted () {
      this.search()
    },
    userUpdated () {
      this.search()
    }
  },
  methods: {
    async search () {
      this.loading = true
      if (!this.query) {
        this.loading = false
        this.users = []
        return
      }

      try {
        let response = await v1.get('/users/search/partial/' + this.query)
        this.loading = false
        this.users = response.data
      } catch (e) {
        this.loading = false
        this.users = undefined
        this.searchUsersAlert = {
          messages: e.response.data.messages,
          color: 'alert--yellow'
        }
      }
    }
  },
  components: {
    MoonLoader: MoonLoader,
    appUser: User,
    appAlert: Alert
  }
}
</script>

<style scoped lang="scss">
</style>
