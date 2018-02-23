<template>
<div class="panel panel__admin">
<app-signup-requests></app-signup-requests>
<app-create-account :privileges="privileges" :subjects="subjects" @creatorMessage="response = $event"></app-create-account>
<div class="module" v-if="response">
  <div class="row">
    <div class="col-1-of-1">
      <p>{{response}}</p>
    </div>
  </div>
</div>
<app-search-users></app-search-users>
</div>

</template>

<script>

import axios from "axios";

import signupRequests from "./signupRequests.vue";
import createAccount from "./createAccount.vue";
import searchUsers from "./searchUsers.vue";

export default {
  props: ["privileges"],
  data: () => {
    return {
      response: false,
      subjects: []
    };
  },
  created() {
    axios.get("/api/getSubjects/")
      .then((response) => {
        this.subjects = response.data;
      }).catch((e) => {
        this.response = e.response.data;
      });
  },
  components: {
    appSignupRequests: signupRequests,
    appCreateAccount: createAccount,
    appSearchUsers: searchUsers
  }
}
</script>

<style scoped lang="scss">

</style>
