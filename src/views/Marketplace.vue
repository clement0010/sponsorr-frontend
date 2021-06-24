<template>
  <BasePage>
    <Spinner :loading="loading && !error" />
    <p v-if="error">Error</p>
    <MarketplaceLayout
      v-if="role && !error"
      :loading="loading"
      :search-result="searchResult"
      :input="userInput"
      :role="role"
      @search="search"
    />
  </BasePage>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref, watch } from '@vue/composition-api';
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
    const error = computed(() => marketplaceError.value || profileError.value);

    watch(authenticated, async () => {
      if (authenticated) {
        loading.value = true;
        await fetchUserProfile(uid.value);
        role.value = profile.value?.role;
        loading.value = false;
      }
    });

    const searchResult: Ref<Sponsor[] | SponsorEventDbItems | undefined> = ref([]);

    const search = async (input: string) => {
      switch (role.value) {
        case 'EventOrganiser':
          searchResult.value = await searchSponsor(input);
          break;
        case 'Sponsor':
          searchResult.value = await searchEvent(input);
          break;
        default:
          break;
      }
      userInput.value = input;
    };

    return {
      loading,
      search,
      searchResult: computed(() => searchResult.value),
      userInput: computed(() => userInput.value),
      role,
      error,
    };
  },
});
</script>
