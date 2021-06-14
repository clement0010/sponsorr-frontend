<template>
  <v-container fluid>
    <v-tabs v-model="tab" class="elevation-3" grow>
      <v-tabs-slider color="blue" />
      <v-tab> </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-data-table></v-data-table>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'MatchesTable',
  setup() {
    // Tab switching
    const tab = ref(null);

    return { tab };
  },
});
</script>
