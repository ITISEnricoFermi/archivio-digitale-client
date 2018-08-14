<template>
<div class="module module--padded">
  <div class="row" v-for="(request, index) in requests" :key="index">
    <div class="col-1-of-1">
      <div class="admin-request">
        <p class="admin-request__name">{{ request.firstname }} {{ request.lastname }}</p>
        <p class="admin-request__choice admin-request__choice--accept" @click="acceptRequest(request._id)">
          <i class="fa fa-check" aria-hidden="true"></i>
        </p>
        <p class="admin-request__choice admin-request__choice--refuse" @click="refuseRequest(request._id)">
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

import axios from 'axios'

export default {
  name: 'signupRequests',
  data: () => {
    return {
      requests: [],
      response: false,
      responseMessage: ''
    }
  },
  created () {
    this.getRequests()
  },
  sockets: {
    newUser () {
      this.getRequests()
    }
  },
  methods: {
    getRequests () {
      axios.get('/admin/requests/')
        .then((response) => {
          this.requests = response.data
        })
        .catch((e) => {
          this.response = true
          this.responseMessage = e.response.data
        })
    },
    acceptRequest (id) {
      axios.post('admin/acceptRequestById', {
        _id: id
      })
        .then((message) => {
          this.getRequests()
        })
        .catch((e) => {
          this.response = true
          this.responseMessage = e.response.data
        })
    },
    refuseRequest (id) {
      axios.post('admin/refuseRequestById', {
        _id: id
      })
        .then((message) => {
          this.getRequests()
        })
        .catch((e) => {
          this.response = true
          this.responseMessage = e.response.data
        })
    }
  }
}
</script>

<style scoped lang="scss">

.admin-request {
  display: table;
  width: 100%;

  &:not(:last-child) {
    border-bottom: 1px solid $color-white-4;
  }

  &__name {
    display: table-cell;
    vertical-align: middle;
    text-align: left;
    font-size: $font-default-1;
  }

  &__choice {
    font-size: 2.5rem;
    display: inline-block;
    float: right;
    margin: 10px;
    cursor: pointer;

    &--accept {
      color: $color-button-green;
    }

    &--refuse {
      color: $color-button-red;
    }
  }
}

</style>
