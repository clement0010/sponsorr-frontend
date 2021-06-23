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
import { defineComponent, onMounted, watch } from '@vue/composition-api';
import useMatch from '@/composable/matchComposition';
import BasePage from '@/layouts/BasePage.vue';
import MatchesLayout from '@/layouts/MatchesLayout.vue';
import useAuth from '@/composable/authComposition';

export default defineComponent({
  name: 'Matches',
  components: {
    BasePage,
    MatchesLayout,
  },
  setup() {
    const { matchCategories, initialise, loading, fetchMatches } = useMatch();
    const { uid, loading: authLoad } = useAuth();

    onMounted(() => {
      watch(authLoad, async () => {
        await initialise(uid.value);
      });
    });

    return {
      matchCategories,
      loading,
      fetchMatches,
    };
  },
});
</script>
