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
} from "@/main";

export default {
  name: "popup",
  props: ["width"],
  data: () => {
    return {

    };
  },
  created() {
    window.addEventListener('keyup', (e) => {
      if(e.keyCode == 27) {
        eventBus.closePopUp();
      }
    });
  }
}
</script>

<style scoped lang="scss">
</style>
