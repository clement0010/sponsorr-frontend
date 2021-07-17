import { fuzzySearchArray, updateEventStatusToDb } from '@/common';
import { applyEventToDb, getEventsFromDb } from '@/common/firestore/marketplace';
import { Messages, SponsorEventDbItems } from '@/types';
import { ref, computed, onMounted } from '@vue/composition-api';
import useSnackbar from './snackbarComposition';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useMarketplace() {
  const { success, alert } = useSnackbar();

  const loading = ref(false);
  const error = ref(false);
  const events = ref<SponsorEventDbItems>([]);

  const filteredEvents = ref<SponsorEventDbItems>([]);

  const initialise = async (): Promise<void> => {
    const eventDbItems = await getEventsFromDb();
    events.value = eventDbItems;
    filteredEvents.value = eventDbItems;
  };

  onMounted(async () => {
    await initialise();
  });

  const searchEvent = async (input: string, criteria: string): Promise<void> => {
    if (!input || !criteria) {
      filteredEvents.value = events.value;
      return;
    }
    filteredEvents.value = fuzzySearchArray(events.value, input, {
      keys: [criteria],
    }).map((result) => result.item);
  };

  const applyEvent = async (
    eventId: string,
    userId: string,
    messages?: Messages,
  ): Promise<void> => {
    try {
      await applyEventToDb(eventId, userId, messages);
      await updateEventStatusToDb(eventId, 'matched');
      success('Application sent!');
    } catch (err) {
      error.value = true;
      alert('Something went wrong!');
    }
  };

  return {
    loading,
    error,
    initialise,
    searchEvent,
    applyEvent,
    filteredEvents: computed(() => filteredEvents.value),
  };
}
