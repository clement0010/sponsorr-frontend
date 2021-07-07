<template>
  <BasePage>
    <MatchesLayout
      :match-categories="matchCategories"
      :loading="loading"
      @fetchMatches="fetchMatches"
      @acceptMatch="accept"
      @rejectMatch="reject"
    />
  </BasePage>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import useMatch from '@/composable/matchComposition';
import BasePage from '@/layouts/BasePage.vue';
import MatchesLayout from '@/layouts/MatchesLayout.vue';

import { Match } from '@/types';

export default defineComponent({
  name: 'Matches',
  components: {
    BasePage,
    MatchesLayout,
  },
  setup() {
    const { matchCategories, loading, fetchMatches, updateUserMatchStatus } = useMatch();

    const accept = async (payload: Match) => {
      await updateUserMatchStatus(payload.eventId, payload.userId, 'accepted', 'Sponsor');
    };

    const reject = async (payload: Match) => {
      await updateUserMatchStatus(payload.eventId, payload.userId, 'rejected', 'Sponsor');
    };

    return {
      matchCategories,
      loading,
      fetchMatches,
      accept,
      reject,
    };
  },
});
</script>
