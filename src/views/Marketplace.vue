<template>
  <BasePage>
    <p v-if="error">Error</p>
    <Spinner v-if="loading" :loading="loading && !error" />
    <MarketplaceLayout
      v-else
      :loading="loading"
      :search-result="events"
      :input="userInput"
      @search="search"
      @search-criteria="searchCriteria"
    />
  </BasePage>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api';
import { Sponsor, SponsorEventDbItems } from '@/types';
import useMarketplace from '@/composable/marketplaceComposition';
import BasePage from '@/layouts/BasePage.vue';
import MarketplaceLayout from '@/layouts/MarketplaceLayout.vue';
import Spinner from '@/components/BuildingElements/Spinner.vue';
import useSnackbar from '@/composable/snackbarComposition';

export default defineComponent({
  name: 'Marketplace',
  components: {
    BasePage,
    MarketplaceLayout,
    Spinner,
  },
  setup() {
    const {
      loading,
      error: marketplaceError,
      searchEvent,
      filteredEvents: events,
    } = useMarketplace();

    const { alert, success } = useSnackbar();

    const userInput = ref('');
    const criteria = ref('Title');
    const error = computed(() => marketplaceError.value);

    const searchResult = ref<Sponsor[] | SponsorEventDbItems>([]);

    const search = async (input: string) => {
      try {
        if (!criteria.value) {
          alert('Please input criteria');
          return;
        }

        userInput.value = input;
        await searchEvent(input, criteria.value);
        success('Successfully searched');
      } catch (err) {
        alert('Something went wrong!');
      }
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
    };
  },
});
</script>
