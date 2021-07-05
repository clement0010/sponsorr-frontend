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
import { defineComponent, onMounted, watch } from '@vue/composition-api';
import useDashboard from '@/composable/dashboardComposition';

import BasePage from '@/layouts/BasePage.vue';
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import { EventCategory, SponsorEventDbItem } from '@/types';
import { authLoading, uid } from '@/composable/store';

export default defineComponent({
  name: 'Dashboard',
  components: {
    BasePage,
    DashboardLayout,
  },
  setup(_, { emit }) {
    const {
      eventCategories,
      initialise,
      fetchEvents,
      loading,
      deleteEvent,
      updateEventStatus,
    } = useDashboard();

    onMounted(() => {
      watch(authLoading, async () => {
        await initialise(uid.value);
      });
    });

    const publishEvent = (payload: SponsorEventDbItem, published: boolean) => {
      if (published) {
        updateEventStatus(payload, true);
        emit('success', 'Event published');
      }
      if (!published) {
        updateEventStatus(payload, false);
        emit('success', 'Event unpublished');
      }
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
