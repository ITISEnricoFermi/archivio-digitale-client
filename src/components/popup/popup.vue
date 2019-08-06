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
import eventBus from '@/utils/eventBus'

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
    background-color: rgba(black, 0.75);
    width: 100vw;
    min-height: 100vh;
    height: auto;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20000;
    cursor: pointer;
    overflow: scroll!important;

    .content {
        height: auto;
        max-width: 90%;
        border-radius: 0.3rem;
        position: absolute;
        padding: 2rem;
        left: 50%;
        transform: translateX(-50%);

        @include respond(phone) {
            width: 90%!important;
        }

        .edit {
            background-color: var(--color-surface-primary);
            border: 1px solid var(--color-neutral-secondary);
            padding: 3vh;
            border-radius: 0.3rem;
        }

    }
}
</style>
