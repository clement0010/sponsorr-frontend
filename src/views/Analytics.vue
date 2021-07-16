<template>
  <BasePage>
    <AnalyticsLayout />
  </BasePage>
</template>

<script lang="ts">
import AnalyticsLayout from '@/layouts/AnalyticsLayout.vue';
import BasePage from '@/layouts/BasePage.vue';

import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'Analytics',
  components: {
    AnalyticsLayout,
    BasePage,
  },
});
</script>
