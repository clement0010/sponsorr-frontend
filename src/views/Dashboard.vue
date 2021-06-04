<template>
  <BasePage>
    <DashboardLayout
      :event-data="eventPacket()"
      @publish="(payload) => $emit('success', payload)"
      @unpublish="(payload) => $emit('success', payload)"
      @deleteEvent="(payload) => $emit('success', payload)"
    />
  </BasePage>
</template>

<script lang="ts">
import BasePage from '@/layouts/BasePage.vue';
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import { defineComponent } from '@vue/composition-api';
import useEvent from '@/composable/eventComposition';

export default defineComponent({
  name: 'Dashboard',
  components: {
    BasePage,
    DashboardLayout,
  },
  setup() {
    const { eventPacket } = useEvent();
    return { eventPacket };
  },
});
</script>
