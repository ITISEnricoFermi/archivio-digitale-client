<template>
<div class="module module--padded">
  <div class="row">
    <div class="col-1-of-1">
      <input type="text" class="textfield" placeholder="Cerca utenti" autocomplete="off" v-model="query" v-on:keyup="search">
      <moon-loader :loading="true" :color="'#000'" :size="'20px'" v-if="loading"></moon-loader>
    </div>
  </div>
</div>
</template>

<script>

import MoonLoader from 'vue-spinner/src/MoonLoader.vue'

import {
  api
} from '@/main'

export default {
  name: 'searchUsers',
  data: () => {
    return {
      query: undefined,
      loading: false
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
        return this.$emit('searchUsers', [])
      }

      try {
        let response = await api.get('/admin/users/search/' + this.query)
        this.loading = false
        this.$emit('searchUsers', response.data)
      } catch (e) {
        this.loading = false
        this.$emit('searchUsers', undefined)
        this.$emit('alert', {
          messages: e.response.data.messages,
          color: 'alert--yellow'
        })
      }
    }
  },
  components: {
    MoonLoader: MoonLoader
  }
}
</script>

<style scoped lang="scss">

</style>
