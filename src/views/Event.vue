<template>
  <BasePage>
    <Spinner v-if="loading && !error && !event" />
    <EventNotFound v-if="error" />
    <EventLayout
      v-if="!loading && !error && event"
      :event="event"
      :is-owner="isOwner"
      :role="role"
      :event-id="eventId"
      :name="name"
      @deleteEvent="remove"
      @publishEvent="publish"
      @edit="edit"
    />
  </BasePage>
</template>

<script lang="ts">
import BasePage from '@/layouts/BasePage.vue';
import EventLayout from '@/layouts/EventLayout.vue';
import EventNotFound from '@/layouts/EventNotFound.vue';
import Spinner from '@/components/BuildingElements/Spinner.vue';

import useAuth from '@/composable/authComposition';
import useEvent from '@/composable/eventComposition';
import useProfile from '@/composable/profileComposition';
import useVisitProfile from '@/composable/visitProfileComposition';

import { SponsorEvent } from '@/types';
import { computed, defineComponent, onBeforeMount, onMounted } from '@vue/composition-api';

export default defineComponent({
  name: 'Event',
  components: {
    Spinner,
    BasePage,
    EventLayout,
    EventNotFound,
  },
  setup(_, { root, emit }) {
    const { uid } = useAuth();
    const {
      event,
      loading: eventLoad,
      error: eventError,
      fetchUserEvent,
      deleteEvent,
      editEvent,
      updateEventStatus,
    } = useEvent();
    const { profile, role } = useProfile();
    const {
      profile: eventOwnerProfile,
      fetchUserProfile,
      loading: profileLoad,
      error: profileError,
    } = useVisitProfile();

    const eventId = root.$route.params.id;

    const isOwner = computed(() => event.value?.userId === uid.value);
    const loading = computed(() => eventLoad.value || profileLoad.value);
    const error = computed(() => eventError.value || profileError.value);

    onBeforeMount(async () => {
      await fetchUserEvent(eventId);
      console.log(event.value?.userId === uid.value);
      if (!isOwner.value) {
        await fetchUserProfile(event.value?.userId || '');
      }
    });

    const edit = async (payload: Record<string, unknown>) => {
      await editEvent(eventId, payload);
    };

    const publish = async (payload: SponsorEvent) => {
      await updateEventStatus(eventId, payload.status, payload.published);
    };

    const remove = async (payload: string) => {
      try {
        await deleteEvent(payload);
        emit('success', 'Event deleted');
        root.$router.push({ name: 'Dashboard' });
      } catch (err) {
        emit('alert', 'Failed to delete!');
      }
    };

    if (isOwner.value) {
      return {
        event,
        loading,
        error,
        publish,
        edit,
        remove,
        isOwner,
        role,
        name: computed(() => profile.value?.name),
        eventId,
      };
    }
    onMounted(async () => {
      await editEvent(eventId, {
        clicks: (event.value?.clicks || 0) + 1,
      });
    });

    return {
      event,
      loading,
      error,
      publish,
      edit,
      remove,
      isOwner,
      role,
      name: computed(() => eventOwnerProfile.value?.name),
      eventId,
    };
  },
});
</script>
