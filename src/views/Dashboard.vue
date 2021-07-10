<template>
  <BasePage>
    <DashboardLayout
      :event-categories="eventCategories"
      :loading="loading"
      @fetchEvents="fetchMoreEvents"
      @deleteEvent="
        (payload) => {
          deleteEvent(payload.eventId, payload.eventStatus);
          $emit('success', 'Event deleted');
        }
      "
      @publishEvent="(payload) => publishEvent(payload, true)"
      @unpublishEvent="(payload) => publishEvent(payload, false)"
    />
  </BasePage>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import useDashboard from '@/composable/dashboardComposition';

import BasePage from '@/layouts/BasePage.vue';
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import { EventCategory, SponsorEventDbItem } from '@/types';
import { uid } from '@/composable/store';

export default defineComponent({
  name: 'Dashboard',
  components: {
    BasePage,
    DashboardLayout,
  },
  setup() {
    const {
      eventCategories,
      fetchEvents,
      loading,
      deleteEvent,
      updateEventStatus,
    } = useDashboard();

    const publishEvent = async (payload: SponsorEventDbItem, published: boolean) => {
      await updateEventStatus(payload, published);
    };

    const fetchMoreEvents = async (eventCategory: EventCategory) => {
      await fetchEvents(uid.value, eventCategory);
    };

    return {
      eventCategories,
      fetchMoreEvents,
      loading,
      deleteEvent,
      publishEvent,
    };
  },
});
</script>
