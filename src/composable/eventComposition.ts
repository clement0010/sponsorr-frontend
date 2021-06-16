import { getEventFromDb } from '@/common/firestore/event';
import { SponsorEvent } from '@/types';
import { computed, ref } from '@vue/composition-api';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useEvent() {
  const testUserId = 'M2vz9kjWxZZfRe3eBocZ3ktSYcX2'; // To be removed
  const loading = ref(true);
  const error = ref(false);

  const event = ref<SponsorEvent>();

  const fetchUserEvent = async (uid: string, eventID: string) => {
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

  return {
    event: computed(() => event.value),
    fetchUserEvent,
    loading,
    error,
  };
}
