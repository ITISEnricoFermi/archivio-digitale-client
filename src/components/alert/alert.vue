<template>
<div class="module module--padded alert" :class="alert.color">
  <p>{{alert.messages[0]}}</p>
</div>
</template>

<script>
export default {
  name: 'error',
  props: ['alert'],
  data () {
    return {
      timeout: undefined
    }
  },
  created () {
    clearTimeout(this.help)
    let self = this
    this.timeout = setTimeout(function () {
      self.$emit('alert', {
        messages: undefined,
        color: undefined
      })
    }, 4000)
  }
}
</script>

<style scoped lang="scss">
.alert {

    &--red {
        @include alertColor($color-palette-red);
    }

    &--green {
        @include alertColor($color-palette-green);
    }

    &--blue {
        @include alertColor($color-palette-blue);
    }

    &--yellow {
        @include alertColor($color-palette-yellow);
    }

}
</style>
