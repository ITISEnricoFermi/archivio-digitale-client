<template>
<div class="popup">
  <div class="content" :style="'width: ' + width + ';'">
    <slot>
      Contenuto del popup
    </slot>
  </div>
</div>
</template>

<script>
import {
  eventBus
} from '@/main'

export default {
  name: 'popup',
  props: ['width'],
  created () {
    window.addEventListener('keyup', (e) => {
      if (e.keyCode === 27) {
        eventBus.closePopUp()
      }
    })
  },
  mounted () {
    let popup = (document.querySelectorAll('.popup'))[0]
    popup.addEventListener('click', (e) => {
      if (e.target !== popup) {
        return
      }
      eventBus.closePopUp()
    })
  }
}
</script>

<style scoped lang="scss">
.popup {
    background-color: rgba($color-black, 0.75);
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20000;
    cursor: pointer;

    .content {
        height: auto;
        max-width: 90%;
        border-radius: 0.3rem;
        position: absolute;
        overflow: hidden;
        @include absCenter;

        @include respond(phone) {
            width: 90%!important;
        }

        .edit {
            background-color: $color-white;
            border: 1px solid $color-white-3;
            padding: 3vh;
            border-radius: 0.3rem;

            @include color-scheme(dark) {
                background-color: rgb(59, 57, 57);
                color: $color-white;
                border-color: lighten(rgb(59, 57, 57), 10%);
            }
        }

    }
}
</style>
