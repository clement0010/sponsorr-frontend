<template>
  <BasePage>
    <MatchesLayout
      :match-categories="matchCategories"
      :loading="loading"
      @fetchMatches="(matchCategory) => fetchMatches(matchCategory)"
    />
  </BasePage>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api';
import useMatch from '@/composable/matchComposition';
import BasePage from '@/layouts/BasePage.vue';
import MatchesLayout from '@/layouts/MatchesLayout.vue';

export default defineComponent({
  name: 'Matches',
  components: {
    BasePage,
    MatchesLayout,
  },
  setup() {
    const { matchCategories, initialise, loading, fetchMatches } = useMatch();

    onMounted(async () => {
      await initialise();
    });

    return {
      matchCategories,
      loading,
      fetchMatches,
    };
  },
});
</script>
