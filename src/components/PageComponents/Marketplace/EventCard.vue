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
      <EventView :event-id="event.eventId" :small="false" :text="true" :classes="'primary--text'" />
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import EventView from '@/components/EventActions/EventView.vue';
import { SponsorEventDbItem } from '@/types';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'EventCard',
  components: {
    EventView,
  },
  props: {
    event: {
      type: Object as () => SponsorEventDbItem,
      required: true,
    },
  },
});
</script>
