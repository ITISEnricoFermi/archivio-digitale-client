<template>
<div class="module profile">
  <img class="profile__pic" sizes="15rem" :srcset="'/pics/' + user._id + '/xs.jpeg 100w, /pics/' + user._id + '/sm.jpeg 300w, /pics/' + user._id + '/md.jpeg 500w, /pics/' + user._id + '/lg.jpeg 800w, /pics/' + user._id + '/xlg.jpeg 1200w'" :alt="user.firstname + ' ' + user.lastname">
  <div class="info">
    <p class="info__name heading-secondary">
      <span class="info__name--firstname">{{user.firstname}}</span>
      <span class="info__name--lastname"> {{user.lastname}}</span>
    </p>
    <p class="info__documents">
      Pubblicazioni: {{user.documents}}
    </p>
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
.profile {
    grid-area: profile;
    display: grid;
    height: 100%;
    grid-template-columns: 15rem auto;

    &__pic {
        width: 15rem;
        display: block;
    }

    .info {
        padding: 3rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;

        & > * {
            margin: 1rem 0;
            text-align: left;

            &:first-child {
                margin-top: 0;
            }

            &:last-child {
                margin-bottom: 0;
            }

        }

        &__documents {
            color: $color-white-6;
        }
    }
}
</style>
