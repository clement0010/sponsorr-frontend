<template>
  <div>
    <v-card-title class="text-h4">
      Matches
    </v-card-title>
    <v-card-text>
      <v-data-table class="elevation-3" :headers="headers" :items="matches" :loading="loading">
        <template #no-data>
          No matches yet
        </template>

        <template #loading>
          Loading matches...
        </template>

        <template #[`item.actions`]="{ item }">
          <MatchActionMenu :match="item" />
        </template>
      </v-data-table>
    </v-card-text>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import MatchActionMenu from '@/components/MatchActions/MatchActionMenu.vue';
import { Matches, SponsorEvent } from '@/types';

export default defineComponent({
  name: 'EventMatchesTable',
  components: {
    MatchActionMenu,
  },
  props: {
    eventId: {
      type: String,
      required: true,
    },
    event: {
      type: Object as () => SponsorEvent,
      required: true,
    },
    matches: {
      type: Array as () => Matches,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
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
