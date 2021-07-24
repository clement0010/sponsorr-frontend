<template>
  <BasePage>
    <DashboardLayout
      :event-categories="eventCategories"
      :loading="loading"
      @fetchEvents="fetchMoreEvents"
      @deleteEvent="
        (eventId) => {
          deleteEvent(eventId);
          $emit('success', 'Event deleted');
        }
      "
      @publishEvent="(payload) => publishEvent(payload, true)"
      @unpublishEvent="(payload) => publishEvent(payload, false)"
      @refetch="refetch"
    />
  </BasePage>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';
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
      fetchEventsByStatus,
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

    const refetch = async () => {
      await fetchEventsByStatus(uid.value, 'published');
      await fetchEventsByStatus(uid.value, 'matched');
      await fetchEventsByStatus(uid.value, 'draft');
    };

    return {
      eventCategories: computed(() => eventCategories.value),
      fetchMoreEvents,
      loading,
      deleteEvent,
      publishEvent,
      refetch,
    };
  },
});
</script>
