<template>
  <div class="progress">
    <div class="bar" :class="{ 'bar--stripped': isStripped, 'bar--animated': isAnimated }" :style="'width: ' + value + '%;'">

    </div>
  </div>
</template>

<script>
export default {
  name: "progressBar",
  props: ["value", "isStripped", "isAnimated"]
}
</script>

<style scoped lang="scss">
</style>
