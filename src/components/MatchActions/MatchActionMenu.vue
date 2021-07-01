<template>
  <v-menu>
    <template #activator="{on, attrs}">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item>
        <router-link :to="{ name: 'Profile', params: { id: match.userId } }">
          <v-btn>View Sponsor</v-btn>
        </router-link>
      </v-list-item>
      <v-list-item>
        <MatchView :messages="match.messages" />
      </v-list-item>
      <v-list-item v-if="match.organiserStatus === 'pending'">
        <MatchAccept :match="match" @acceptMatch="(payload) => $emit('acceptMatch', payload)" />
      </v-list-item>
      <v-list-item v-if="match.organiserStatus === 'pending'">
        <MatchReject :match="match" @rejectMatch="(payload) => $emit('rejectMatch', payload)" />
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import MatchAccept from '@/components/MatchActions/MatchAccept.vue';
import MatchReject from '@/components/MatchActions/MatchReject.vue';
import MatchView from '@/components/MatchActions/MatchView.vue';
import { Match } from '@/types';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'MatchActionMenuEvent',
  components: {
    MatchAccept,
    MatchReject,
    MatchView,
  },
  props: {
    match: {
      type: Object as () => Match,
      required: true,
    },
  },
});
</script>
