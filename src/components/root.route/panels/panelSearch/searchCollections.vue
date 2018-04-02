<template>
<div class="module">
  <div class="row">
    <div class="col-1-of-2">
      <input type="text" class="module-input-text" placeholder="Cerca una collezione" v-model="query.fulltext" @keyup.enter="search">
    </div>
    <div class="col-1-of-2">
      <select class="module-input-select" v-model="query.permissions">
            <option class="module-input-option" value="" selected>Permessi (modifica)</option>
            <option class="module-input-option" :value="permission._id" v-for="(permission, index) in collectionsPermissions" :key="index">{{ permission.permission }}</option>
        </select>
    </div>
  </div>
  <div class="row">
    <div class="col-1-of-1">
      <button class="button button--green" @click="search"><span><i class="fas fa-search"></i></span>Cerca</button>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'searchCollections',
  props: ['collectionsPermissions'],
  data: () => {
    return {
      query: {
        fulltext: '',
        permissions: ''
      }
    }
  },
  methods: {
    search () {
      axios.post('/collections/search/', this.query)
        .then((response) => {
          this.$emit('searchCollections', response.data)
        })
        .catch((e) => {
          this.$emit('searchCollections', [])
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
