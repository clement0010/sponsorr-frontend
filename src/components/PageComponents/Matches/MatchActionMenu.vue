<template>
  <v-menu>
    <template #activator="{on, attrs}">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item v-if="match.sponsorStatus === 'pending'">
        <MatchAccept :match="match" @accept-match="toggleModal" />
      </v-list-item>
      <v-list-item v-if="match.sponsorStatus === 'pending'">
        <MatchReject :match="match" />
      </v-list-item>
      <v-list-item>
        <EventView :event-id="match.eventId" />
      </v-list-item>
    </v-list>
    <MatchAcceptModal
      :activate="activateModal"
      :match-user-id="matchUserId"
      @toggleModal="toggleModal"
    />
  </v-menu>
</template>

<script lang="ts">
import EventView from '@/components/EventActions/EventView.vue';
import MatchAccept from '@/components/MatchActions/MatchAccept.vue';
import MatchAcceptModal from '@/components/MatchActions/MatchAcceptModal.vue';
import MatchReject from '@/components/MatchActions/MatchReject.vue';
import useProfile from '@/composable/profileComposition';

import { Match } from '@/types';
import { computed, defineComponent, ref, toRefs } from '@vue/composition-api';

export default defineComponent({
  name: 'MatchActionMenuMatches',
  components: {
    MatchAccept,
    MatchAcceptModal,
    MatchReject,
    EventView,
  },
  props: {
    match: {
      type: Object as () => Match,
      required: true,
    },
  },
  setup(props) {
    const { role } = useProfile();
    const { match } = toRefs(props);

    const activateModal = ref(false);

    const toggleModal = () => {
      activateModal.value = !activateModal.value;
    };

    return {
      activateModal: computed(() => activateModal.value),
      toggleModal,
      matchUserId: computed(() =>
        role.value === 'Sponsor' ? match.value.organiserId : match.value.userId,
      ),
    };
  },
});
</script>
