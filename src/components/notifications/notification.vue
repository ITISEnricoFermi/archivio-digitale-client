<template>
  <div class="notification u-noselect">
    <p>
      <span class="result u-select">{{ notification.title }}</span>
      <span class="remove" @click="remove"><i class="fas fa-times"></i></span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'notification',
  props: ['notification'],
  data: () => {
    return {

    }
  },
  created () {
    if (this.notification.temporary) {
      // clearTimeout(this.timeout)
      let self = this
      this.timeout = setTimeout(function () {
        self.$emit('remove')
      }, 4000)
    }
  },
  methods: {
    remove () {
      this.$emit('remove')
    }
  }
}
</script>

<style scoped lang="scss">
.notification {
  background-color: rgba($color-tertiary, 0.8);
  border-radius: 0.25rem;
  padding-right: 3rem;
  padding: 2vh 4vh 2vh 2vh;
  font-size: $font-default-3;
  color: $color-white;
  position: relative;

  &:hover .remove {
      transform: translateY(-50%) rotate(90deg);
  }

  .remove {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%) rotate(0deg);
    cursor: pointer;
  }

}
</style>
