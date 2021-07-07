<template>
  <v-btn class="error" @click="reject">
    Reject
  </v-btn>
</template>

<script lang="ts">
import useMatch from '@/composable/matchComposition';
import useProfile from '@/composable/profileComposition';

import { Match } from '@/types';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'MatchReject',
  props: {
    match: {
      type: Object as () => Match,
      required: true,
    },
  },
  setup(props) {
    const { match } = props;
    const { updateUserMatchStatus } = useMatch();
    const { role } = useProfile();

    const reject = async () => {
      await updateUserMatchStatus(match.eventId, match.userId, 'rejected', role.value);
    };

    return {
      reject,
    };
  },
});
</script>
