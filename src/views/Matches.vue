<template>
  <BasePage>
    <MatchesLayout
      :match-categories="matchCategories"
      :loading="loading"
      @fetchMatches="fetchMatches"
      @refetch="refetch"
    />
  </BasePage>
</template>

<script lang="ts">
import BasePage from '@/layouts/BasePage.vue';
import MatchesLayout from '@/layouts/MatchesLayout.vue';

import useMatch from '@/composable/matchComposition';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'Matches',
  components: {
    BasePage,
    MatchesLayout,
  },
  setup() {
    const { matchCategories, loading, fetchMatches, fetchMatchesByStatus } = useMatch();

    const refetch = async () => {
      await fetchMatchesByStatus('pending');
      await fetchMatchesByStatus('rejected');
      await fetchMatchesByStatus('accepted');
    };

    return {
      matchCategories,
      loading,
      fetchMatches,
      refetch,
    };
  },
});
</script>
