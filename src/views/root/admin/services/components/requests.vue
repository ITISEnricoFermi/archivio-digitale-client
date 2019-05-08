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
  <div class="row" v-if="!requests.length">
    <div class="col-1-of-1">
      <p>Nessuna richiesta di registrazione.</p>
    </div>
  </div>
</div>
</template>

<script>
import eventBus from '@/utils/eventBus'
import v1 from '@/utils/v1'

export default {
  data () {
    return {
      requests: []
    }
  },
  async created () {
    try {
      this.requests = await this.getRequests()
    } catch (e) {
      eventBus.notification({
        title: 'Impossibile reperire le richieste di iscrizione.',
        temporary: true
      })
    }
  },
  sockets: {
    async newUser () {
      this.requests = await this.getRequests()
    }
  },
  methods: {
    async getRequests () {
      const response = await v1.get('/admin/requests/')
      return response.data
    },
    async acceptRequest (id) {
      try {
        await v1.patch('/admin/requests/' + id)
        this.requests = await this.getRequests()
        eventBus.notification({
          title: 'La richiesta di iscrizione è stata accettata.',
          temporary: true
        })
      } catch (e) {
        eventBus.notification({
          title: 'Impossibile accettare la richiesta di iscrizione.',
          temporary: true
        })
      }
    },
    async refuseRequest (id) {
      try {
        await v1.delete('/admin/requests/' + id)
        this.requests = await this.getRequests()
        eventBus.notification({
          title: 'La richiesta di iscrizione è stata rifiutata.',
          temporary: true
        })
      } catch (e) {
        eventBus.notification({
          title: 'Impossibile rifiutare la richiesta di iscrizione.',
          temporary: true
        })
      }
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
