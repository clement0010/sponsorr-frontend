<template>
  <v-card max-width="400">
    <v-card-title>
      {{ event.title }}
    </v-card-title>
    <v-card-subtitle>
      {{ event.venue }}
    </v-card-subtitle>
    <v-img class="align-end" height="200px" :src="event.picture" />
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
      <AuthenticationPrompt />
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import AuthenticationPrompt from '@/components/Authentication/AuthenticationPrompt.vue';
import EventView from '@/components/EventActions/EventView.vue';
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
    authenticated: {
      type: Boolean,
      required: true,
    },
  },
});
</script>
