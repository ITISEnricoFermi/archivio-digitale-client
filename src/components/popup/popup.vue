<template>
<div class="popup">
  <div class="popup__box" :style="'width: ' + width + ';'">
    <!-- <div class="popup__header">
      <p class="popup-header--close" @click="closePopUp"><i class="fa fa-times" aria-hidden="true"></i></p>
    </div> -->
    <slot>
      Contenuto del popup
    </slot>
  </div>
</div>
</template>

<script>

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
        this.closePopUp();
      }
    });
  },
  methods: {
    closePopUp() {
      this.$emit("closePopUp");
    }
  }
}
</script>

<style scoped lang="scss">
</style>
