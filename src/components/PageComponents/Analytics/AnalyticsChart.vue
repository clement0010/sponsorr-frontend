<template>
  <v-card :width="500">
    <BarChart :data="testData" :options="options" />
  </v-card>
</template>

<script lang="ts">
import useAnalytics from '@/composable/analyticsComposition';
import { BarChart } from 'vue-chart-3';
import { computed, defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'AnalyticsChart',
  components: { BarChart },
  setup() {
    const { data, role } = useAnalytics();

    const testData = computed(() =>
      role.value === 'EventOrganiser'
        ? {
            labels: ['Clicks', 'Views', 'Matches'],
            datasets: [
              {
                data: data.value,
                backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
              },
            ],
          }
        : {
            labels: ['Accepted', 'Pending', 'Rejected'],
            datasets: [
              {
                data: data.value,
                backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
              },
            ],
          },
    );

    const options = ref({
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: role.value === 'EventOrganiser' ? 'Events Summary' : 'Matches Summary',
          font: {
            size: 20,
          },
        },
      },
      scales: {
        y: {
          min: 0,
          ticks: {
            stepSize: 1,
          },
        },
      },
    });

    return { testData, options };
  },
});
</script>
