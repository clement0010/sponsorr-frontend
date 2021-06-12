<template>
  <BasePage>
    <DashboardLayout
      :event-categories="eventCategories"
      :loading="loading"
      @fetchEvents="(eventCategory) => fetchEvents(eventCategory)"
      @deleteEvent="
        (payload) => {
          deleteEvent(payload.event, payload.eventCategory);
          $emit('success', payload.message);
        }
      "
      @publishEvent="
        (payload) => {
          publishEvent(payload.event);
          $emit('success', payload.message);
        }
      "
      @unpublishEvent="
        (payload) => {
          unpublishEvent(payload);
          $emit('success', 'Event unpublished');
        }
      "
    />
  </BasePage>
</template>

<script lang="ts">
import BasePage from '@/layouts/BasePage.vue';
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import { defineComponent, onMounted } from '@vue/composition-api';
import useEvent from '@/composable/eventComposition';

export default defineComponent({
  name: 'Dashboard',
  components: {
    BasePage,
    DashboardLayout,
  },
  setup() {
    const {
      eventCategories,
      initialise,
      fetchEvents,
      loading,
      deleteEvent,
      publishEvent,
      unpublishEvent,
    } = useEvent();

    onMounted(async () => {
      await initialise();
    });

    return {
      eventCategories,
      fetchEvents,
      loading,
      deleteEvent,
      publishEvent,
      unpublishEvent,
    };
  },
});
</script>
