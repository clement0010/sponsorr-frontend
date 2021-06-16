<template>
  <BasePage>
    <Spinner v-if="loading && !error" />
    <p v-else-if="error">Error loading event</p>
    <EventLayout :event="event" />
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
  setup(_, { root }) {
    const { fetchUserEvent, event, loading, error } = useEvent();
    const eventId = root.$route.params.id;

    onMounted(async () => {
      await fetchUserEvent('foo', eventId);
    });

    return {
      event,
      loading,
      error,
    };
  },
});
</script>
