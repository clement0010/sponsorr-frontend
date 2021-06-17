<template>
  <BasePage>
    <Spinner v-if="loading && !error" />
    <p v-else-if="error">Error loading event</p>
    <EventLayout
      v-else
      :event="event"
      @deleteEvent="remove"
      @publishEvent="publish"
      @unpublishEvent="unpublish"
      @edit="edit"
    />
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
      fetchUserEvent,
      event,
      loading,
      error,
      deleteEvent,
      publishEvent,
      unpublishEvent,
      editUserEvent,
    } = useEvent();

    const eventId = root.$route.params.id;

    const edit = async (payload: Record<string, unknown>) => {
      try {
        await editUserEvent(eventId, payload);
        emit('success', 'Successfully edited!');
      } catch (err) {
        emit('alert', 'Failed to edit!');
        console.error(err);
      }
    };

    const publish = async (payload: SponsorEvent) => {
      try {
        await publishEvent(payload);
        emit('success', 'Event published');
      } catch (err) {
        emit('alert', 'Failed to publish!');
      }
    };

    const unpublish = async (payload: SponsorEvent) => {
      try {
        await unpublishEvent(payload);
        emit('success', 'Event unpublished');
      } catch (err) {
        emit('alert', 'Failed to unpublish!');
      }
    };

    const remove = async (payload: SponsorEvent) => {
      try {
        await deleteEvent(payload);
        emit('success', 'Event deleted');
      } catch (err) {
        emit('alert', 'Failed to delete!');
      }
    };

    onMounted(async () => {
      console.log(event);
      await fetchUserEvent('foo', eventId);
      console.log(event);
    });

    return {
      event,
      loading,
      error,
      publish,
      unpublish,
      edit,
      remove,
    };
  },
});
</script>
