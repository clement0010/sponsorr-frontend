<template>
  <v-container fluid class="secondary">
    <v-row justify="center">
      <v-card width="1320px" color="transparent" class="my-16" flat>
        <v-card-title class="text-h2">
          Analytics
        </v-card-title>
        <AnalyticsChart />
      </v-card>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import AnalyticsChart from '@/components/PageComponents/Analytics/AnalyticsChart.vue';

import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'AnalyticsLayout',
  components: {
    AnalyticsChart,
  },
});
</script>
