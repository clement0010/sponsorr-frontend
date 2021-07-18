import { fuzzySearchArray } from '@/common';
import { getEventsFromDb } from '@/common/firestore/marketplace';
import { SponsorEventDbItems } from '@/types';
import { ref, computed, onMounted } from '@vue/composition-api';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useMarketplace() {
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

  return {
    loading,
    error,
    initialise,
    searchEvent,
    filteredEvents: computed(() => filteredEvents.value),
  };
}
