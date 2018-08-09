<template>
<div class="module chart">
  <!-- <app-chart :width="120" :height="250"></app-chart> -->
</div>
</template>

<script>
export default {
  name: 'chart',
  data: () => {
    return {

    }
  }
}
</script>

<style scoped lang="scss">
.chart {
    grid-area: chart;

    @include respond(tab-por) {
        display: none;
    }
}
</style>
