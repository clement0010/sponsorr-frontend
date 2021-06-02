<template>
  <v-container fluid>
    <v-tabs>
      <v-tabs-slider color="blue" />
      <v-tab> Upcoming Events </v-tab>
      <v-tab> Past Events </v-tab>
      <v-tab> Drafts </v-tab>
    </v-tabs>

    <v-data-table :headers="headers" :items="events"> </v-data-table>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import useEvent from '@/composable/eventComposition';

export default defineComponent({
  name: 'EventTable',
  setup() {
    const headers = [
      { text: 'Event Title', sortable: false, value: 'title' },
      { text: 'Date', value: 'date' },
      { text: 'Venue', value: 'venue' },
    ];

    const { events } = useEvent();
    return { headers, events };
  },
});
</script>
