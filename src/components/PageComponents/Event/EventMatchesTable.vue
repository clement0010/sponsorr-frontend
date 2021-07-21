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

        <template #[`item.status`]="{ item }">
          {{ parseMatchStatus(item).message }}
          <v-tooltip top>
            <template #activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" class="zoom" v-on="on">
                <v-icon v-if="item.status === 'accepted'" color="green" small
                  >mdi-checkbox-marked-circle-outline</v-icon
                >
                <v-icon v-if="item.status === 'pending'" small color="yellow"
                  >mdi-dots-horizontal-circle-outline</v-icon
                >
                <v-icon v-if="item.status === 'rejected'" small color="red"
                  >mdi-close-circle-outline</v-icon
                >
              </v-btn>
            </template>
            <span>{{ parseMatchStatus(item).tooltipMessage }}</span>
          </v-tooltip>
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
import { parseMatchStatus } from '@/common/utils';

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
      parseMatchStatus,
    };
  },
});
</script>

<style scoped>
.zoom {
  transition: transform 0.2s; /* Animation */
}

.zoom:hover {
  transform: scale(2);
}
</style>
