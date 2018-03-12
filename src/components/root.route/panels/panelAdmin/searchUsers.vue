<template>
<div>
  <div class="module" id="module-admin-users-search">
    <div class="row">
      <div class="col-1-of-1">
        <input type="text" class="module-input-text" placeholder="Cerca utenti" autocomplete="off" v-model="query" v-on:keyup="search">
      </div>
    </div>
  </div>
  <app-search-users-results v-if="query" :users="users" :query="query" @dataChanged="search"></app-search-users-results>
</div>
</template>

<script>
import searchUsersResults from "./searchUsersResults.vue";

import axios from "axios";

export default {
  name: "searchUsers",
  data: () => {
    return {
      users: [],
      query: "",
      response: false,
      responseMessage: ""
    };
  },
  methods: {
    search() {
      axios.post("/admin/getUsers/", {
          key: this.query
        })
        .then((response) => {
          this.users = response.data;
        })
        .catch((e) => {
          this.response = true;
          this.responseMessage = e.response.data;
        });
    }
  },
  components: {
    appSearchUsersResults: searchUsersResults
  }
}
</script>

<style scoped lang="scss">

</style>
