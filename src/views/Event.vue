<template>
  <BasePage>
    <Spinner :loading="loading && !error" />
    <p v-if="error">Error loading event</p>
    <EventLayout
      v-if="role && !(error || loading)"
      :event="event"
      :is-owner="isOwner"
      :role="role"
      @deleteEvent="remove"
      @publishEvent="publish"
      @edit="edit"
      @apply="sendApplication"
    />
  </BasePage>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref, watch } from '@vue/composition-api';
import { Role, SponsorEvent } from '@/types';

import BasePage from '@/layouts/BasePage.vue';
import EventLayout from '@/layouts/EventLayout.vue';
import Spinner from '@/components/BuildingElements/Spinner.vue';
import useEvent from '@/composable/eventComposition';
import useProfile from '@/composable/profileComposition';
import useAuth from '@/composable/authComposition';
import useMarketplace from '@/composable/marketplaceComposition';
import { generateUnixTime } from '@/common';

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
    const { profile, fetchUserProfile } = useProfile();
    const { uid, authenticated } = useAuth();
    const { applyEvent } = useMarketplace();

    const isOwner = computed(() => event.value?.userId === uid.value);
    const role: Ref<Role | undefined> = ref();

    const eventId = root.$route.params.id;

    const edit = async (payload: Record<string, unknown>) => {
      try {
        await editEvent(eventId, payload);
        emit('success', 'Successfully edited!');
        root.$router.push({ name: 'Matches' });
      } catch (err) {
        emit('alert', 'Failed to edit!');
        console.error(err);
      }
    };

    const publish = async (payload: SponsorEvent) => {
      const message = payload.status === 'published' ? 'Event published' : 'Event unpublished';
      try {
        await updateEventStatus(eventId, payload.status, payload.published);
        emit('success', message);
      } catch (err) {
        emit('alert', 'Process failed');
      }
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

    // TODO: Send logic
    const sendApplication = async (payload: string) => {
      try {
        emit('success', 'Sending application');
        await applyEvent(eventId, uid.value, [{ message: payload, timestamp: generateUnixTime() }]);
        emit('success', 'Application sent');
      } catch (err) {
        emit('alert', 'Send application failed');
      }
    };

    watch(authenticated, async () => {
      if (authenticated.value) {
        loading.value = true;
        await fetchUserProfile(uid.value);
        await fetchUserEvent(eventId);
        role.value = profile.value?.role;
        loading.value = false;
        if (!isOwner.value && !error.value) {
          await editEvent(eventId, { clicks: (event.value?.clicks || 0) + 1 });
        }
      }
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
      sendApplication,
    };
  },
});
</script>
