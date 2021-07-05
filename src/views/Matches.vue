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
import { updateEventStatusToDb } from '@/common';

export default defineComponent({
  name: 'Matches',
  components: {
    BasePage,
    MatchesLayout,
  },
  setup(_, { emit }) {
    const {
      matchCategories,
      loading,
      fetchMatches,
      updateMatchStatus,
      updateUserMatchStatus,
    } = useMatch();

    const accept = async (payload: Match) => {
      try {
        await updateUserMatchStatus(payload.eventId, payload.userId, 'accepted', 'Sponsor');
        await updateEventStatusToDb(payload.eventId, 'matched', true);
        emit('success', 'Match accepted');
      } catch (err) {
        emit('alert', 'Process failed');
      }
    };

    const reject = async (payload: Match) => {
      try {
        await updateUserMatchStatus(payload.eventId, payload.userId, 'rejected', 'Sponsor');
        await updateMatchStatus(payload, 'rejected');
        emit('success', 'Match rejected');
      } catch (err) {
        emit('alert', 'Process failed');
      }
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
