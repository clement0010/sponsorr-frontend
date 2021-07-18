<template>
  <v-btn class="error" @click="reject">
    Reject
  </v-btn>
</template>

<script lang="ts">
import useMatch from '@/composable/matchComposition';
import useProfile from '@/composable/profileComposition';

import { Match } from '@/types';
import { defineComponent, toRefs } from '@vue/composition-api';

export default defineComponent({
  name: 'MatchReject',
  props: {
    match: {
      type: Object as () => Match,
      required: true,
    },
  },
  setup(props) {
    const { match } = toRefs(props);
    const { updateUserMatchStatus } = useMatch();
    const { role } = useProfile();

    const reject = async () => {
      await updateUserMatchStatus(match.value, 'rejected', role.value);
      if (role.value === 'Sponsor') {
        match.value.sponsorStatus = 'rejected';
      }
      if (role.value === 'EventOrganiser') {
        match.value.organiserStatus = 'rejected';
      }
      match.value.status = 'rejected';
    };

    return {
      reject,
    };
  },
});
</script>
