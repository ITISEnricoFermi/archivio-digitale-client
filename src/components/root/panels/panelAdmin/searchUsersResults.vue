<template>
  <div class="module">
    <div class="row" v-for="user in users">
      <div class="col-1-of-1">
        <article class="module-admin-users-search-article">
          <p class="module-admin-users-search-article--name u-margin-bottom-medium">{{user.firstname}} {{user.lastname}}</p>
          <p class="module-admin-users-search-article--privileges u-margin-bottom-medium"></p>
          <a v-bind:href="`mailto:${user.email}`" class="module-admin-users-search-article--email u-margin-bottom-medium"><span>Email: </span>{{user.email}}</a>
          <p class="module-admin-users-search-article--password-reset u-color-blue" @click="resetPassword(user._id)">Reimposta password</p>


          <p class="module-admin-users-search-article--toggle-privileges u-color-yellow" @click="togglePrivileges(user._id)" v-if="user.privileges === 'user'">Rendi admin</p>
          <p class="module-admin-users-search-article--toggle-privileges u-color-yellow" @click="togglePrivileges(user._id)" v-else>Rendi user</p>
          <p class="module-admin-users-search-article--account-disable u-color-green" @click="toggleState(user._id)" v-if="user.state === 'disabled'">Attiva</p>
          <p class="module-admin-users-search-article--account-disable u-color-red" @click="toggleState(user._id)" v-else>Disattiva</p>
        </article>
      </div>
    </div>
    <div class="row" v-if="users.length === 0">
      <div class="col-1-of-1">
        <p class="module-document-search-noresults">Nessun risultato</p>
      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "searchUsersResults",
  props: ["users"],
  data: () => {
    return {
      response: false,
      responseMessage: ""
    };
  },
  methods: {
    resetPassword(id) {

    },
    togglePrivileges(id) {
      axios.post("/admin/togglePrivileges", {
          _id: id
        })
        .then(() => {
          this.$emit("dataChanged");
        })
        .catch((e) => {
          this.response = true;
          this.responseMessage = e.response.data;
        });
    },
    toggleState(id) {
      axios.post("/admin/toggleState", {
          _id: id
        })
        .then(() => {
          this.$emit("dataChanged");
        })
        .catch((e) => {
          this.response = true;
          this.responseMessage = e.response.data;
        });
    },
  }
}
</script>

<style scoped lang="scss">
</style>
