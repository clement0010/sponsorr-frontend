<template>
  <BasePage>
    <p v-if="error">Error</p>
    <Spinner v-if="loading" :loading="loading && !error" />
    <MarketplaceLayout
      v-else
      :loading="loading"
      :search-result="events"
      :input="userInput"
      :authenticated="authenticated"
      @search="search"
      @search-criteria="searchCriteria"
    />
  </BasePage>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, Ref, ref } from '@vue/composition-api';
import { Sponsor, SponsorEventDbItems } from '@/types';
import useMarketplace from '@/composable/marketplaceComposition';
import BasePage from '@/layouts/BasePage.vue';
import MarketplaceLayout from '@/layouts/MarketplaceLayout.vue';
import useAuth from '@/composable/authComposition';
import Spinner from '@/components/BuildingElements/Spinner.vue';

export default defineComponent({
  name: 'Marketplace',
  components: {
    BasePage,
    MarketplaceLayout,
    Spinner,
  },
  setup(_, { emit }) {
    const {
      loading,
      error: marketplaceError,
      searchEvent,
      initialise,
      filteredEvents: events,
    } = useMarketplace();
    const { authenticated } = useAuth();

    const userInput = ref('');
    const criteria = ref('');
    const error = computed(() => marketplaceError.value);

    onMounted(async () => {
      await initialise();
    });

    const searchResult: Ref<Sponsor[] | SponsorEventDbItems | undefined> = ref([]);

    const search = async (input: string) => {
      if (!criteria.value) {
        emit('alert', 'Please input criteria');
        return;
      }

      if (criteria.value === 'budget') {
        emit('alert', 'Not ready yet. To be extended');
        return;
      }

      userInput.value = input;
      await searchEvent(input, criteria.value);
    };

    const searchCriteria = (input: string) => {
      if (!input) {
        searchEvent('', input);
      }
      criteria.value = input;
    };

    return {
      loading,
      search,
      searchResult: computed(() => searchResult.value),
      userInput: computed(() => userInput.value),
      error,
      searchCriteria,
      events,
      authenticated,
    };
  },
});
</script>
