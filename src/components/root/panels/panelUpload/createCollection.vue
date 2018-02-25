<template>
  <div class="module">
    <div class="row">
      <div class="col-1-of-2">
        <input type="text" class="module-input-text" placeholder="Collezione" v-model="collection.documentCollection">
      </div>
      <div class="col-1-of-2">
        <select class="module-input-select" v-model="collection.permissions">
          <option class="module-input-option" value="undefined" disabled selected>Permessi (modifica)</option>
          <option class="module-input-option" v-for="permission in collectionsPermissions" :value="permission._id">{{permission.permission}}</option>
        </select>
      </div>
    </div>
    <div class="row" v-if="toggleMultipleSelect">
      <div class="col-1-of-1">
        <app-multiple-select :placeholder="'Autorizzazioni'" :multipleSelectData="users" :dbElements="dbElements" @elementAdded="collection.authorizations = $event"></app-multiple-select>
      </div>
    </div>
    <div class="row" v-if="collection.authorizations.length !== 0 && toggleMultipleSelect">
      <div class="col-1-of-1">
        <app-multiple-select-results :multipleSelectOutput="collection.authorizations" :dbElements="dbElements" @elementRemoved="collection.authorizations = $event"></app-multiple-select-results>
      </div>
    </div>
    <div class="row">
      <div class="col-1-of-1">
        <button class="module-button module-button--green" @click="createCollection">Crea collezione</button>
      </div>
    </div>
  </div>
</template>

<script>

import multipleSelect from "@/components/multipleSelect/multipleSelect.vue";
import multipleSelectResults from "@/components/multipleSelect/multipleSelectResults.vue";

import axios from "axios";

export default {
  name: "createCollection",
  props: ["collectionsPermissions"],
  data: () => {
    return {
      dbElements: ["firstname", "lastname"],
      users: [],
      collection: {
        documentCollection: undefined,
        permissions: undefined,
        authorizations: []
      },
      response: false,
      responseMessage: ""
    };
  },
  computed: {
    toggleMultipleSelect() {
      if(this.collection.permissions == "utenti") {
        return true;
      }
      this.collection.authorizations = [];
      return false;
    }
  },
  created() {
    axios.get("/api/getUsers/")
    .then((response) => {
      this.users = response.data;
    })
    .catch((e) => {
      this.response = true;
      this.responseMessage = e.response.data;
    });
  },
  methods: {
    createCollection() {
      axios.put("/collections/", this.collection)
      .then((response) => {

        this.collection.documentCollection = "";
        this.collection.permissions = undefined;
        this.collection.authorizations = [];

        this.$emit("collectionMessage", response.data);
      })
      .catch((e) => {
        this.$emit("collectionMessage", e.respone.data);
      });
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
