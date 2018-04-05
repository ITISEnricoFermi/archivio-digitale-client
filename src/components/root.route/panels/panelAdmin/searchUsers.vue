<template>
<div class="module">
  <div class="row">
    <div class="col-1-of-1">
      <input type="text" class="module-input-text" placeholder="Cerca utenti" autocomplete="off" v-model="query" v-on:keyup="search">
    </div>
  </div>
</div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'searchUsers',
  data: () => {
    return {
      query: undefined
    }
  },
  sockets: {
    userDeleted () {
      console.log('ciao')
      this.search()
    },
    userUpdated () {
      this.search()
    }
  },
  methods: {
    search () {
      if (!this.query) {
        return this.$emit('searchUsers', [])
      }
      axios.get('/admin/users/search/' + this.query)
        .then((response) => {
          this.$emit('searchUsers', response.data)
        })
        .catch((e) => {
          this.$emit('searchUsers', undefined)
          this.$emit('alert', {
            messages: e.response.data.messages,
            color: 'alert--yellow'
          })
        })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
