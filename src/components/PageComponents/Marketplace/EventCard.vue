<template>
  <v-card width="400">
    <v-card-title>
      {{ event.title }}
    </v-card-title>
    <v-card-subtitle>
      {{ event.venue }}
    </v-card-subtitle>
    <v-img v-if="event.picture" class="align-end" height="200px" :src="event.picture" />
    <v-img
      v-else
      class="align-end"
      height="200px"
      :src="
        'https://firebasestorage.googleapis.com/v0/b/sponsorr-dev.appspot.com/o/public_assets%2Fimage-placeholder.svg?alt=media&token=076e81e1-858d-4e5f-9937-a7e247baf838'
      "
    />
    <v-card-text class="text-truncate">
      {{ event.description }}
    </v-card-text>
    <v-card-actions>
      <EventView
        v-if="authenticated"
        :event-id="event.eventId"
        :small="false"
        :text="true"
        :classes="'primary--text'"
      />
      <AuthenticationPrompt v-else />
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import AuthenticationPrompt from '@/components/Authentication/AuthenticationPrompt.vue';
import EventView from '@/components/EventActions/EventView.vue';

import { authenticated } from '@/composable/store';
import { SponsorEventDbItem } from '@/types';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'EventCard',
  components: {
    AuthenticationPrompt,
    EventView,
  },
  props: {
    event: {
      type: Object as () => SponsorEventDbItem,
      required: true,
    },
  },
  setup() {
    return {
      authenticated,
    };
  },
});
</script>
