<template>
  <BasePage>
    <Spinner :loading="loading && !error" />
    <p v-if="error">Error</p>
    <MarketplaceLayout
      v-if="!error && role"
      :loading="loading"
      :search-result="events"
      :input="userInput"
      :role="role"
      :authenticated="authenticated"
      @search="search"
      @search-criteria="searchCriteria"
    />
  </BasePage>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, Ref, ref, watch } from '@vue/composition-api';
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
    const { loading, error: marketplaceError, searchEvent, initialise, events } = useMarketplace();
    const { profile, error: profileError, fetchUserProfile } = useProfile();
    const { authenticated, uid } = useAuth();

    const role: Ref<Role | undefined> = ref();
    const userInput = ref('');
    const criteria = ref('');
    const error = computed(() => marketplaceError.value || profileError.value);

    onMounted(async () => {
      await initialise();
    });

    watch(authenticated, async () => {
      if (authenticated) {
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
      if (!input) {
        await initialise();

        return;
      }

      if (criteria.value === 'budget') {
        console.log('Not ready yet. To be extended');
        return;
      }

      switch (role.value) {
        case 'EventOrganiser':
          console.log('Not available at this stage');
          await searchEvent(input, criteria.value);
          break;
        case 'Sponsor':
          await searchEvent(input, criteria.value);
          break;
        default:
          break;
      }
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
      events,
      authenticated,
    };
  },
});
</script>
