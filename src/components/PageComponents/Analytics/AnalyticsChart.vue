<template>
  <v-card :width="500" class="elevation-5 rounded-lg">
    <BarChart :data="barChartData" :options="barChartConfig" />
  </v-card>
</template>

<script lang="ts">
import useAnalytics, { barChartConfig } from '@/composable/analyticsComposition';
import { BarChart } from 'vue-chart-3';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'AnalyticsChart',
  components: { BarChart },
  setup() {
    const { barChartData } = useAnalytics();

    return {
      barChartData,
      barChartConfig,
    };
  },
});
</script>
