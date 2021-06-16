<template>
  <BasePage>
    <Spinner v-if="loading && !error" />
    <p v-else-if="error">Error loading event</p>
    <EventLayout
      :event="event"
      @deleteEvent="
        (payload) => {
          deleteEvent(payload);
          $emit('success', 'Event deleted');
        }
      "
      @publishEvent="
        (payload) => {
          publishEvent(payload);
          $emit('success', 'Event published');
        }
      "
      @unpublishEvent="
        (payload) => {
          unpublishEvent(payload);
          $emit('success', 'Event unpublished');
        }
      "
      @edit="edit"
    />
  </BasePage>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api';
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

    onMounted(async () => {
      await fetchUserEvent('foo', eventId);
    });

    return {
      event,
      loading,
      error,
      deleteEvent,
      publishEvent,
      unpublishEvent,
      edit,
    };
  },
});
</script>
