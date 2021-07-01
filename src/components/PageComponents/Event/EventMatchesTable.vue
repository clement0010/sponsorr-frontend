<template>
  <div>
    <v-card-title class="text-h4">
      Matches
    </v-card-title>
    <v-card-text>
      <v-data-table class="elevation-3" :headers="headers" :items="matches">
        <template #no-data>
          No matches yet
        </template>

        <template #[`item.actions`]="{ item }">
          <MatchActionMenu
            :match="item"
            @acceptMatch="(payload) => $emit('acceptMatch', payload)"
            @rejectMatch="(payload) => $emit('rejectMatch', payload)"
          />
        </template>
      </v-data-table>
    </v-card-text>
  </div>
</template>

<script lang="ts">
import { Matches } from '@/types';
import { defineComponent } from '@vue/composition-api';

import MatchActionMenu from '@/components/MatchActions/MatchActionMenu.vue';

export default defineComponent({
  name: 'EventMatchesTable',
  components: {
    MatchActionMenu,
  },
  props: {
    matches: {
      type: Array as () => Matches,
      required: true,
    },
  },
  setup() {
    const headers = [
      {
        text: 'Sponsor',
        value: 'name',
      },
      {
        text: 'Status',
        value: 'status',
      },
      {
        text: 'Actions',
        value: 'actions',
        align: 'center',
        sortable: false,
      },
    ];

    return {
      headers,
    };
  },
});
</script>
