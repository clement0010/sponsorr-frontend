<template>
  <BasePage>
    <Spinner v-if="loading && !error" />
    <p v-else-if="error">Error loading event</p>
    <EventLayout v-else :event="event" @deleteEvent="remove" @publishEvent="publish" @edit="edit" />
  </BasePage>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api';
import { SponsorEvent } from '@/types';

import BasePage from '@/layouts/BasePage.vue';
import EventLayout from '@/layouts/EventLayout.vue';
import Spinner from '@/components/BuildingElements/Spinner.vue';
import useEvent from '@/composable/eventComposition';

export default defineComponent({
  name: 'Event',
  components: {
    Spinner,
    BasePage,
    EventLayout,
  },
  setup(_, { root, emit }) {
    const {
      event,
      loading,
      error,
      fetchUserEvent,
      deleteEvent,
      editEvent,
      updateEventStatus,
    } = useEvent();

    const eventId = root.$route.params.id;

    const edit = async (payload: Record<string, unknown>) => {
      try {
        await editEvent(eventId, payload);
        emit('success', 'Successfully edited!');
      } catch (err) {
        emit('alert', 'Failed to edit!');
        console.error(err);
      }
    };

    const publish = async (payload: SponsorEvent) => {
      try {
        await updateEventStatus(eventId, payload.status);
        emit('success', 'Event published');
      } catch (err) {
        emit('alert', 'Process failed');
      }
    };

    const remove = async () => {
      try {
        await deleteEvent(eventId);
        emit('success', 'Event deleted');
      } catch (err) {
        emit('alert', 'Failed to delete!');
      }
    };

    onMounted(async () => {
      await fetchUserEvent(eventId);
    });

    return {
      event,
      loading,
      error,
      publish,
      edit,
      remove,
    };
  },
});
</script>
