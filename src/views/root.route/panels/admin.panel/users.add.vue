<template>
<div class="module module--padded">
  <div class="row">
    <div class="col-1-of-2">
      <input type="text" class="textfield" placeholder="Nome" autocomplete="off" v-model="user.firstname" @keyup.enter="createUser">
    </div>
    <div class="col-1-of-2">
      <input type="text" class="textfield" placeholder="Cognome" autocomplete="off" v-model="user.lastname" @keyup.enter="createUser">
    </div>
  </div>
  <div class="row">
    <div class="col-1-of-2">
      <input type="email" class="textfield" placeholder="Email" autocomplete="off" v-model="user.email" @keyup.enter="createUser">
    </div>
    <div class="col-1-of-2">
      <input type="password" class="textfield" placeholder="Password" autocomplete="off" v-model="user.password" @keyup.enter="createUser">
    </div>
  </div>
  <div class="row">
    <div class="col-1-of-2">
      <select class="select" v-model="user.privileges">
          <option class="module-input-option" disabled value=undefined>Privilegi</option>
          <option class="module-input-option" v-for="(privilege, index) in privileges" :key="index" :value="privilege._id">{{privilege.privilege}}</option>
        </select>
    </div>
    <div class="col-1-of-2">
      <app-multiple-select :placeholder="'Visibilità'" :selected.sync="user.accesses" :dbElements="['subject']" :url="'/api/subjects/search/partial/'" @update:selected="user.accesses = $event"></app-multiple-select>
    </div>
  </div>
  <div class="row" v-if="user.accesses.length != 0">
    <div class="col-1-of-1">
      <app-multiple-select-results :selected.sync="user.accesses" :dbElements="['subject']" @update:selected="user.accesses = $event"></app-multiple-select-results>
    </div>
  </div>
  <div class="row">
    <div class="col-1-of-1">
      <button class="button button--green" @click="createUser">
        <span class="icon"><i class="fas fa-edit"></i></span>
        <span class="crop">Crea account</span>
      </button>
    </div>
  </div>
</div>
</template>

<script>
import MultipleSelect from '@/components/multipleSelect/multipleSelect'
import MultipleSelectResults from '@/components/multipleSelect/multipleSelectResults'

import axios from 'axios'

export default {
  name: 'createAccount',
  props: ['privileges', 'subjects'],
  data: () => {
    return {
      user: {
        firstname: undefined,
        lastname: undefined,
        email: undefined,
        password: undefined,
        privileges: undefined,
        accesses: []
      }
    }
  },
  computed: {
    computedAccesses () {
      return {
        accesses: this.user.accesses.map(el => el._id)
      }
    }
  },
  methods: {
    async createUser () {
      try {
        await axios.put('/admin/users/', {
          user: {
            ...this.user,
            ...this.computedAccesses
          }
        })

        this.user.firstname = undefined
        this.user.lastname = undefined
        this.user.email = undefined
        this.user.password = undefined
        this.user.privileges = undefined
        this.user.accesses = []

        this.$emit('alert', {
          messages: ['Utente creato correttamente.'],
          color: 'alert--green'
        })
      } catch (e) {
        this.$emit('alert', {
          messages: e.response.data.messages,
          color: 'alert--red'
        })
      }
    }
  },
  components: {
    appMultipleSelect: MultipleSelect,
    appMultipleSelectResults: MultipleSelectResults
  }

}
</script>

<style scoped lang="scss">

</style>
