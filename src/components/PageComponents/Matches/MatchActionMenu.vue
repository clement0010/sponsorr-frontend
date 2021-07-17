<template>
  <v-menu>
    <template #activator="{on, attrs}">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item v-if="match.sponsorStatus === 'pending'">
        <MatchAccept :match="match" />
      </v-list-item>
      <v-list-item v-if="match.sponsorStatus === 'pending'">
        <MatchReject :match="match" />
      </v-list-item>
      <v-list-item>
        <EventView :event-id="match.eventId" />
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import EventView from '@/components/EventActions/EventView.vue';
import MatchAccept from '@/components/MatchActions/MatchAccept.vue';
import MatchReject from '@/components/MatchActions/MatchReject.vue';

import { Match } from '@/types';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'MatchActionMenuMatches',
  components: {
    MatchAccept,
    MatchReject,
    EventView,
  },
  props: {
    match: {
      type: Object as () => Match,
      required: true,
    },
  },
});
</script>
