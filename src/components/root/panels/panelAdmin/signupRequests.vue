<template>
<div class="module">
  <div class="row" v-for="request in requests">
    <div class="col-1-of-1">
      <div class="module__admin-request">
        <p class="module__admin-request--name">{{ request.firstname }} {{ request.lastname }}</p>
        <p class="module__admin-request--choice module__admin-request--choice--accept" @click="acceptRequest(request._id)">
          <i class="fa fa-check" aria-hidden="true"></i>
        </p>
        <p class="module__admin-request--choice module__admin-request--choice--refuse" @click="refuseRequest(request._id)">
          <i class="fa fa-times" aria-hidden="true"></i>
        </p>
      </div>
    </div>
  </div>
  <div class="row" v-if="requests.length === 0">
    <div class="col-1-of-1">
      <p>Nessuna richiesta di registrazione.</p>
    </div>
  </div>
</div>
</template>

<script>

import axios from "axios";

export default {
  name: "signupRequests",
  data: () => {
    return {
      requests: [],
      response: false,
      responseMessage: ""
    };
  },
  created() {
    this.getRequests();
  },
  methods: {
    getRequests() {
      axios.post("/admin/getRequests")
        .then((response) => {
          this.requests = response.data;
        })
        .catch((e) => {
          this.response = true;
          this.responseMessage = e.response.data;
        });
    },
    acceptRequest(id) {
      axios.post("admin/acceptRequestById", {
          _id: id
        })
        .then((message) => {
          this.getRequests();
        })
        .catch((e) => {
          this.response = true;
          this.responseMessage = e.response.data;
        });
    },
    refuseRequest(id) {
      axios.post("admin/refuseRequestById", {
          _id: id
        })
        .then((message) => {
          this.getRequests();
        })
        .catch((e) => {
          this.response = true;
          this.responseMessage = e.response.data;
        });
    }
  }
}
</script>

<style scoped lang="scss">
</style>
