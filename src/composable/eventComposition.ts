import { getEventFromDb, updateUserEventFromDb } from '@/common/firestore/event';
import router from '@/router';
import { SponsorEvent } from '@/types';
import { computed, ref } from '@vue/composition-api';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useEvent() {
  const testUserId = 'M2vz9kjWxZZfRe3eBocZ3ktSYcX2'; // To be removed
  const loading = ref(true);
  const error = ref(false);

  const event = ref<SponsorEvent>();

  const fetchUserEvent = async (uid: string, eventID: string): Promise<void> => {
    try {
      loading.value = true;

      // Todo: integrate uid
      const userEvent = await getEventFromDb(testUserId, eventID);

      if (!userEvent) {
        throw new Error('Failed to fetch event');
      }

      event.value = userEvent;
      error.value = false;
    } catch (err) {
      console.error(err);
      error.value = true;
    } finally {
      loading.value = false;
    }
  };

  const deleteEvent = async (userEvent: SponsorEvent) => {
    try {
      loading.value = true;
      // Firebase call
      router.push({ name: 'Dashboard' });
    } catch (err) {
      console.error(err);
      error.value = true;
    } finally {
      loading.value = false;
    }
  };

  const publishEvent = async (userEvent: SponsorEvent) => {
    try {
      loading.value = true;
      // Firebase call
    } catch (err) {
      console.error(err);
      error.value = true;
    } finally {
      loading.value = false;
    }
  };

  const unpublishEvent = async (userEvent: SponsorEvent) => {
    try {
      loading.value = true;
      // Firebase call
    } catch (err) {
      console.error(err);
      error.value = true;
    } finally {
      loading.value = false;
    }
  };

  const editUserEvent = async (eventID: string, newData: Record<string, unknown>) => {
    try {
      if (!event.value) {
        console.log('No event to edit!');
        return;
      }
      event.value = {
        ...event.value,
        ...newData,
      };
      await updateUserEventFromDb(testUserId, eventID, newData);
      return;
    } catch (err) {
      throw new Error(err);
    }
  };

  return {
    event: computed(() => event.value),
    fetchUserEvent,
    loading,
    error,
    deleteEvent,
    publishEvent,
    unpublishEvent,
    editUserEvent,
  };
}
