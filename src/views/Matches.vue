<template>
  <BasePage>
    <MatchesLayout
      :match-categories="matchCategories"
      :loading="loading"
      @fetchMatches="fetchMatches"
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
    const { matchCategories, loading, fetchMatches } = useMatch();

    return {
      matchCategories,
      loading,
      fetchMatches,
    };
  },
});
</script>
