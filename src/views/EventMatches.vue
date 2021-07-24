<template>
  <BasePage>
    <EventMatchesLayout />
  </BasePage>
</template>

<script lang="ts">
import BasePage from '@/layouts/BasePage.vue';
import EventMatchesLayout from '@/layouts/EventMatchesLayout.vue';

import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'EventMatches',
  components: {
    BasePage,
    EventMatchesLayout,
  },
});
</script>
