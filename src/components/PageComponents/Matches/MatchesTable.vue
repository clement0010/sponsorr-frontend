<template>
  <v-container fluid>
    <v-tabs v-model="tab" class="elevation-3" grow>
      <v-tabs-slider color="blue" />
      <v-tab
        v-for="matchCategory in matchCategories"
        :key="matchCategory.name"
        @click="$emit('fetchMatches', matchCategory)"
      >
        {{ matchCategory.name }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="matchCategory in matchCategories" :key="matchCategory.name">
        <v-data-table
          :headers="matchCategory.headers"
          :items="matchCategory.contents"
          :loading="loading"
          :loading-text="'Loading your matches...'"
        >
          <template #no-data>
            {{ matchCategory.fallback }}
          </template>

          <template #[`item.event.date`]="{ item }">
            {{ generateDateRangeFromUnixTimeRange([item.start, item.end], 'DD MMM YYYY') }}
          </template>
        </v-data-table>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script lang="ts">
import { MatchCategory } from '@/types';
import { defineComponent, ref } from '@vue/composition-api';
import { generateDateRangeFromUnixTimeRange } from '@/common/utils';

export default defineComponent({
  name: 'MatchesTable',
  props: {
    matchCategories: {
      type: Array as () => MatchCategory[],
      default: () => [],
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    // Tab switching
    const tab = ref(null);

    return {
      tab,
      generateDateRangeFromUnixTimeRange,
    };
  },
});
</script>
