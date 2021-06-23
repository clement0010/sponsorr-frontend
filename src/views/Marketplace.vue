<template>
  <BasePage>
    <MarketplaceLayout
      :loading="loading"
      :search-result="searchResult"
      :input="userInput"
      :role="role"
      @search="search"
    />
  </BasePage>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from '@vue/composition-api';
import { Role, Sponsor, SponsorEventDbItems } from '@/types';
import useMarketplace from '@/composable/marketplaceComposition';
import BasePage from '@/layouts/BasePage.vue';
import MarketplaceLayout from '@/layouts/MarketplaceLayout.vue';

export default defineComponent({
  name: 'Marketplace',
  components: {
    BasePage,
    MarketplaceLayout,
  },
  setup() {
    const { loading, searchSponsor, searchEvent } = useMarketplace();

    const searchResult: Ref<Sponsor[] | SponsorEventDbItems | undefined> = ref([]);
    const userInput = ref('');

    // TODO: figure out how to get user role, then pass it in as prop
    const role: Ref<Role> = ref('Sponsor');

    const search = async (input: string) => {
      if (role.value === 'EventOrganiser') {
        searchResult.value = await searchSponsor(input);
      }
      if (role.value === 'Sponsor') {
        searchResult.value = await searchEvent(input);
      }
      userInput.value = input;
    };

    return {
      loading,
      search,
      searchResult: computed(() => searchResult.value),
      userInput: computed(() => userInput.value),
      role,
    };
  },
});
</script>
