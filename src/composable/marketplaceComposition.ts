import { fuzzySearchArray } from '@/common';
import { applyEventToDb, getEventsFromDb } from '@/common/firestore/marketplace';
import { Messages, SponsorEventDbItems } from '@/types';
import { ref, computed } from '@vue/composition-api';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useMarketplace() {
  const loading = ref(false);
  const error = ref(false);
  const events = ref<SponsorEventDbItems>([]);

  const initialise = async (): Promise<void> => {
    const eventDbItems = await getEventsFromDb();
    events.value = eventDbItems;
  };

  const searchEvent = async (input: string, criteria: string): Promise<void> => {
    events.value = fuzzySearchArray(events.value, input, {
      keys: [criteria],
    }).map((result) => result.item);
  };

  const applyEvent = async (
    eventId: string,
    userId: string,
    messages?: Messages,
  ): Promise<void> => {
    await applyEventToDb(eventId, userId, messages);
  };

  return {
    loading,
    error,
    initialise,
    searchEvent,
    applyEvent,
    events: computed(() => events.value),
  };
}
