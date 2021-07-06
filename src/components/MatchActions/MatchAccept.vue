<template>
  <v-btn class="success" @click="accept">
    Accept
  </v-btn>
</template>

<script lang="ts">
import useMatch from '@/composable/matchComposition';
import useProfile from '@/composable/profileComposition';

import { Match } from '@/types';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'MatchAccept',
  props: {
    match: {
      type: Object as () => Match,
      required: true,
    },
  },
  setup(props) {
    const { match } = props;
    const { updateMatchStatus, updateUserMatchStatus } = useMatch();
    const { role } = useProfile();

    const accept = async () => {
      await updateMatchStatus(match, 'accepted');
      await updateUserMatchStatus(match.eventId, match.userId, 'accepted', role.value);
    };

    return {
      accept,
    };
  },
});
</script>
