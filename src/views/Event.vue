<template>
  <BasePage>
    <EventLayout />
  </BasePage>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import BasePage from '@/layouts/BasePage.vue';
import EventLayout from '@/layouts/EventLayout.vue';

export default defineComponent({
  name: 'Event',
  components: {
    BasePage,
    EventLayout,
  },
});
</script>
