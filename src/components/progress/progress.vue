<template>
<div class="module">
  <div class="row">
    <div class="col-1-of-1">
      <div class="progress">
        <div class="bar" :class="{ 'bar--stripped': isStripped, 'bar--animated': isAnimated }" :style="'width: ' + value + '%;'">

        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {
  eventBus
} from "@/main";


export default {
  name: "progressBar",
  props: ["value", "isStripped", "isAnimated"]
}
</script>

<style scoped lang="scss">
</style>
