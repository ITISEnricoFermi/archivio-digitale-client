<template>
<div class="module panel__dashboard--profile">
  <div class="profile-box" v-if="user">
    <div v-bind:style="'background-image: url(pics/' + user.img + ');'" class="profile-img"></div>
    <div class="profile-info">
      <p class="profile-info--name heading-secondary">{{user.firstname}} {{user.lastname}}</p>
      <p class="profile-info--documents heading-tertiary">Pubblicazioni: {{user.documents}}</p>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'profile',
  props: ['user'],
  data: () => {
    return {
      response: false,
      responseMessage: ''
    }
  }
}
</script>

<style scoped lang="scss">
.panel__dashboard--profile {
    grid-area: profile;
    display: table;
    height: 100%;
    @include respond(tab-por) {
      height: auto;
    }

    .profile-box {
      display: table-cell;
      vertical-align: middle;

      .profile-img {
        width: 20vh;
        height: 20vh;
        display: inline-block;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        -webkit-clip-path: circle(50% at 50% 50%);
        clip-path: circle(50% at 50% 50%);
      }

      .profile-info {
        margin: 1rem;

        &--documents,
        &--name {
          margin: 0.5rem;
        }
      }
    }
  }
</style>
