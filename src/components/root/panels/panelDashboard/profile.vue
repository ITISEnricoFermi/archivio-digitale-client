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
import axios from "axios";

export default {
  name: "profile",
  props: ["user"],
  data: () => {
    return {
      response: false,
      responseMessage: ""
    };
  }
}
</script>

<style scoped lang="scss">

</style>
