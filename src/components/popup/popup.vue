<template>
<div class="popup">
  <div class="popup__box" :style="'width: ' + width + ';'">
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
  data: () => {
    return {

    }
  },
  created () {
    window.addEventListener('keyup', (e) => {
      if (e.keyCode == 27) {
        eventBus.closePopUp()
      }
    })
  }
}
</script>

<style scoped lang="scss">
.popup {
    background-color: rgba($color-black, 0.75);
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20000;

    &__box {
        height: auto;
        max-width: 90%;
        background-color: $color-white;
        border: 1px solid $color-white-3;
        border-radius: 0.3rem;
        padding: 3vh;
        position: absolute;
        @include absCenter;
        @include respond(phone) {
            width: 90%!important;
        }
    }
}
</style>
