<template>
  <v-container fluid class="secondary">
    <v-container class="content">
      <v-row>
        <v-card-title class="text-h2">
          Event Matches
        </v-card-title>
      </v-row>
      <v-row justify="center" align="center">
        <EventMatchesTable />
      </v-row>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import EventMatchesTable from '@/components/PageComponents/EventMatches/EventMatchesTable.vue';

import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'EventMatchesLayout',
  components: {
    EventMatchesTable,
  },
});
</script>

<style scoped>
.content {
  max-width: 1320px;
}
</style>
