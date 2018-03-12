<template>
<main class="panel panel__admin">
  <app-signup-requests></app-signup-requests>
  <app-create-account :privileges="privileges" :subjects="subjects" @alert="userAlert = $event"></app-create-account>
  <transition name="fade">
    <app-alert v-if="userAlert.message" :alert="userAlert" @alert="userAlert = $event"></app-alert>
  </transition>
  <app-search-users></app-search-users>
</main>
</template>

<script>
import axios from "axios";

import signupRequests from "./signupRequests.vue";
import createAccount from "./createAccount.vue";
import searchUsers from "./searchUsers.vue";
import Alert from "@/components/alert/alert";

export default {
  props: ["privileges"],
  data: () => {
    return {
      response: false,
      subjects: [],
      userAlert: {
        message: undefined,
        color: undefined
      }
    };
  },
  created() {
    axios.get("/api/getSubjects/")
      .then((response) => {
        this.subjects = response.data;
      }).catch((e) => {
        this.userAlert = {
          message: e.response.data,
          color: "alert--red"
        };
      });
  },
  components: {
    appSignupRequests: signupRequests,
    appCreateAccount: createAccount,
    appSearchUsers: searchUsers,
    appAlert: Alert
  }
}
</script>

<style scoped lang="scss">

</style>
