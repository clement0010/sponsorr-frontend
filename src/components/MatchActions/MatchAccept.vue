<template>
  <v-btn class="success" @click="accept">
    Accept
  </v-btn>
</template>

<script lang="ts">
import useMatch from '@/composable/matchComposition';
import useProfile from '@/composable/profileComposition';

import { Match } from '@/types';
import { defineComponent, toRefs } from '@vue/composition-api';

export default defineComponent({
  name: 'MatchAccept',
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

    const accept = async () => {
      await updateUserMatchStatus(match.value.eventId, match.value.userId, 'accepted', role.value);
      if (role.value === 'Sponsor') {
        match.value.sponsorStatus = 'accepted';
      }
      if (role.value === 'EventOrganiser') {
        match.value.organiserStatus = 'accepted';
      }
    };

    return {
      accept,
    };
  },
});
</script>
