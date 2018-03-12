<template>
<div class="module">
  <div class="row">
    <div class="col-1-of-2">
      <input type="text" class="module-input-text" placeholder="Nome" autocomplete="off" v-model="user.firstname">
    </div>
    <div class="col-1-of-2">
      <input type="text" class="module-input-text" placeholder="Cognome" autocomplete="off" v-model="user.lastname">
    </div>
  </div>
  <div class="row">
    <div class="col-1-of-2">
      <input type="email" class="module-input-text" placeholder="Email" autocomplete="off" v-model="user.email">
    </div>
    <div class="col-1-of-2">
      <input type="password" class="module-input-text" placeholder="Password" autocomplete="off" v-model="user.password">
    </div>
  </div>
  <div class="row">
    <div class="col-1-of-2">
      <select class="module-input-select" v-model="user.privileges">
          <option class="module-input-option" disabled value="">Privilegi</option>
          <option class="module-input-option" v-for="privilege in privileges" v-bind:value="privilege._id">{{privilege.privilege}}</option>
        </select>
    </div>
    <div class="col-1-of-2">
      <app-multiple-select :placeholder="'Visibilità'" :multipleSelectData="subjects" :dbElements="dbElements" @elementAdded="user.accesses = $event"></app-multiple-select>
    </div>
  </div>
  <div class="row" v-if="user.accesses.length != 0">
    <div class="col-1-of-1">
      <app-multiple-select-results :multipleSelectOutput="user.accesses" :dbElements="dbElements" @elementRemoved="user.accesses = $event"></app-multiple-select-results>
    </div>
  </div>
  <div class="row">
    <div class="col-1-of-1">
      <button class="button button--green" @click="createUser">Crea account</button>
    </div>
  </div>
</div>
</template>

<script>
import multipleSelect from '@/components/multipleSelect/multipleSelect.vue'
import multipleSelectResults from '@/components/multipleSelect/multipleSelectResults.vue'

import axios from 'axios'

export default {
  name: 'createAccount',
  props: ['privileges', 'subjects'],
  data: () => {
    return {
      // multipleSelectOutput: "",
      dbElements: ['subject'],
      response: false,
      responseMessage: '',
      user: {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        privileges: '',
        accesses: []
      }
    }
  },
  methods: {

    createUser () {
      axios.post('/admin/createUser', this.user)
        .then((user) => {
          this.user.firstname = ''
          this.user.lastname = ''
          this.user.email = ''
          this.user.password = ''
          this.user.privileges = ''
          this.user.accesses = []

          this.$emit('alert', {
            message: 'Utente creato correttamente.',
            color: 'alert--green'
          })
        })
        .catch((e) => {
          this.$emit('alert', {
            message: e.response.data,
            color: 'alert--red'
          })
        })
    }
  },
  components: {
    appMultipleSelect: multipleSelect,
    appMultipleSelectResults: multipleSelectResults
  }

}
</script>

<style scoped lang="scss">

</style>
