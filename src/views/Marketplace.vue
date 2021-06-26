<template>
  <BasePage>
    <Spinner :loading="loading && !error" />
    <p v-if="error">Error</p>
    <MarketplaceLayout
      v-if="!error && role"
      :loading="loading"
      :search-result="searchResult"
      :input="userInput"
      :role="role"
      :authenticated="authenticated"
      @search="search"
      @search-criteria="searchCriteria"
    />
  </BasePage>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, Ref, ref } from '@vue/composition-api';
import { Role, Sponsor, SponsorEventDbItems } from '@/types';
import useMarketplace from '@/composable/marketplaceComposition';
import BasePage from '@/layouts/BasePage.vue';
import MarketplaceLayout from '@/layouts/MarketplaceLayout.vue';
import useProfile from '@/composable/profileComposition';
import useAuth from '@/composable/authComposition';
import Spinner from '@/components/BuildingElements/Spinner.vue';

export default defineComponent({
  name: 'Marketplace',
  components: {
    BasePage,
    MarketplaceLayout,
    Spinner,
  },
  setup() {
    const { loading, error: marketplaceError, searchSponsor, searchEvent } = useMarketplace();
    const { profile, error: profileError, fetchUserProfile } = useProfile();
    const { authenticated, uid } = useAuth();

    const role: Ref<Role | undefined> = ref();
    const userInput = ref('');
    const criteria = ref('');
    const error = computed(() => marketplaceError.value || profileError.value);

    onMounted(async () => {
      console.log(authenticated.value);
      if (authenticated.value) {
        loading.value = true;
        await fetchUserProfile(uid.value);
        role.value = profile.value?.role;
        loading.value = false;
      } else {
        role.value = 'Sponsor';
      }
    });

    const searchResult: Ref<Sponsor[] | SponsorEventDbItems | undefined> = ref([]);

    const search = async (input: string) => {
      switch (role.value) {
        case 'EventOrganiser':
          searchResult.value = await searchSponsor(input, criteria.value);
          break;
        case 'Sponsor':
          searchResult.value = await searchEvent(input, criteria.value);
          break;
        default:
          break;
      }
      userInput.value = input;
    };

    const searchCriteria = (input: string) => {
      criteria.value = input;
    };

    return {
      loading,
      search,
      searchResult: computed(() => searchResult.value),
      userInput: computed(() => userInput.value),
      role,
      error,
      searchCriteria,
      authenticated,
    };
  },
});
</script>
