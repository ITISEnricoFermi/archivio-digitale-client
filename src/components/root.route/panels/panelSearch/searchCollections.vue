<template>
<div class="module">
  <div class="row">
    <div class="col-1-of-2">
      <input type="text" class="module-input-text" placeholder="Cerca una collezione" v-model="query.fulltext" @keyup.enter="search">
    </div>
    <div class="col-1-of-2">
      <select class="module-input-select" v-model="query.permissions">
            <option class="module-input-option" value="" selected>Permessi (modifica)</option>
            <option class="module-input-option" v-for="permission in collectionsPermissions" :value="permission._id">{{ permission.permission }}</option>
        </select>
    </div>
  </div>
  <div class="row">
    <div class="col-1-of-1">
      <button class="button button--green" @click="search">Cerca</button>
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
      },
      response: false,
      responseMessage: ''
    }
  },
  methods: {
    search () {
      axios.post('/collections/search/', this.query)
        .then((response) => {
          let collections = response.data

          for (let i = 0; i < collections.length; i++) {
            if (collections[i].author._id === response.headers['x-userid'] || response.headers['x-userprivileges'] === 'admin') {
              collections[i].own = true
            }
          }

          this.$emit('searchCollections', collections)
        })
        .catch((e) => {
          this.$emit('searchCollections', [])
          this.$emit('alert', {
            message: e.response.data,
            color: 'alert--yellow'
          })
        })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
