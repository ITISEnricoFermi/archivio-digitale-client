<template>
<div class="module panel__dashboard--chart">
  <!-- <app-chart :width="120" :height="250"></app-chart> -->
</div>
</template>

<script>

import Chart from "@/components/chart/chart.js";

import axios from "axios";

export default {
  name: "chart",
  data: () => {
    return {

    };
  },
  components: {
    appChart: Chart
  }
}
</script>

<style scoped lang="scss">
</style>
