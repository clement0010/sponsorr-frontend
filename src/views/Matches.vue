<template>
  <BasePage>
    <MatchesLayout
      :match-categories="matchCategories"
      :loading="loading"
      @fetchMatches="(matchCategory) => fetchMatches(matchCategory)"
      @acceptMatch="accept"
      @rejectMatch="reject"
    />
  </BasePage>
</template>

<script lang="ts">
import { defineComponent, onMounted, watch } from '@vue/composition-api';
import useMatch from '@/composable/matchComposition';
import BasePage from '@/layouts/BasePage.vue';
import MatchesLayout from '@/layouts/MatchesLayout.vue';
import useAuth from '@/composable/authComposition';
import { Match } from '@/types';

export default defineComponent({
  name: 'Matches',
  components: {
    BasePage,
    MatchesLayout,
  },
  setup(_, { emit }) {
    const { matchCategories, initialise, loading, fetchMatches, updateMatchStatus } = useMatch();
    const { uid, loading: authLoad } = useAuth();

    onMounted(() => {
      watch(authLoad, async () => {
        await initialise(uid.value);
      });
    });

    const accept = async (payload: Match) => {
      try {
        await updateMatchStatus(payload, 'accepted');
        emit('success', 'Match accepted');
      } catch (err) {
        emit('alert', 'Process failed');
      }
    };

    const reject = async (payload: Match) => {
      try {
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
