<template>
  <div class="module alert" :class="alert.color">
    <p>{{alert.message}}</p>
  </div>

</template>

<script>
export default {
  name: "error",
  props: ["alert"],
  data: () => {
    return {
      timeout: undefined
    };
  },
  created() {
    clearTimeout(this.help)
    let self = this;
    this.timeout = setTimeout(function() {
      self.$emit("alert", {
        message: undefined,
        color: undefined
      });
    }, 4000);
  }
}
</script>

<style scoped lang="scss">
</style>
