<template>
<div class="module panel__dashboard--profile">
  <div class="profile-box" v-if="user">
    <img class="profile-img" sizes="20vh" :srcset="'/pics/' + user._id + '/xs.jpeg 100w, /pics/' + user._id + '/sm.jpeg 300w, /pics/' + user._id + '/md.jpeg 500w, /pics/' + user._id + '/lg.jpeg 800w, /pics/' + user._id + '/xlg.jpeg 1200w'" :alt="user.firstname + ' ' + user.lastname">
    <div class="profile-info">
      <p class="profile-info--name heading-secondary">{{user.firstname}} {{user.lastname}}</p>
      <p class="profile-info--documents heading-tertiary">Pubblicazioni: {{user.documents}}</p>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'profile',
  props: ['user']
}
</script>

<style scoped lang="scss">
.panel__dashboard--profile {
    grid-area: profile;
    display: table;
    height: 100%;
    @include respond(tab-por) {
        height: auto;
        display: none;
    }

    .profile-box {
        display: table-cell;
        vertical-align: middle;

        .profile-img {
            width: 20vh;
            height: 20vh;
            display: inline-block;
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
