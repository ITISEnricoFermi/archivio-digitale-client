<template>
<div class="module">
  <div class="row">
    <div class="col-1-of-1">
      <article class="user-box">
        <p class="user-box__name u-margin-bottom-medium">{{user.firstname}} {{user.lastname}}</p>
        <p class="user-box__privileges u-margin-bottom-medium"></p>
        <a v-bind:href="`mailto:${user.email}`" class="user-box__email u-margin-bottom-medium"><span>Email: </span>{{user.email}}</a>
        <p class="user-box__password-reset u-color-blue" @click="resetPassword(user._id)">Reimposta password</p>

        <p class="user-box__toggle-privileges u-color-yellow" @click="togglePrivileges(user._id)" v-if="user.privileges === 'user'">Rendi admin</p>
        <p class="user-box__toggle-privileges u-color-yellow" @click="togglePrivileges(user._id)" v-else>Rendi user</p>
        <p class="user-box__toggle-state u-color-green" @click="toggleState(user._id)" v-if="user.state === 'disabled'">Attiva</p>
        <p class="user-box__toggle-state u-color-red" @click="toggleState(user._id)" v-else>Disattiva</p>
      </article>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'user',
  props: ['user'],
  data: () => {
    return {
      // response: false,
      // responseMessage: ""
    }
  },
  methods: {
    resetPassword (id) {
      console.log('Ciao')
    },
    togglePrivileges (id) {
      axios.post('/admin/togglePrivileges', {
        _id: id
      })
        .then(() => {
          this.$emit('dataChanged')
        })
        .catch((e) => {
          // this.response = true;
          // this.responseMessage = e.response.data;
        })
    },
    toggleState (id) {
      axios.post('/admin/toggleState', {
        _id: id
      })
        .then(() => {
          this.$emit('dataChanged')
        })
        .catch((e) => {
          // this.response = true;
          // this.responseMessage = e.response.data;
        })
    }
  }
}
</script>

<style scoped lang="scss">
.user-box {
    text-align: left;
    padding: 1rem;

    &__name {
        display: inline-block;
        font-size: $font-default-1;
    }

    &__privileges {
        display: inline-block;
    }

    &__email {
        display: block;
        text-decoration: none;
        color: $color-tertiary;
        font-size: $font-default-2;

        span {
            font-weight: bold;
        }

    }

    &__password-reset,
    &__toggle-privileges,
    &__toggle-state {
        display: inline-block;
        text-decoration: underline;
        font-size: $font-default-2;
        cursor: pointer;
    }

}
</style>
