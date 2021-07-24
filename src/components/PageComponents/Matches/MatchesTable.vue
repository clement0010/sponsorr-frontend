<template>
  <v-container fluid>
    <v-tabs v-model="tab" class="elevation-5 rounded-t-lg" grow>
      <v-tabs-slider color="blue" />
      <v-tab
        v-for="matchCategory in matchCategories"
        :key="matchCategory.name"
        @click="$emit('fetchMatches', matchCategory)"
      >
        {{ matchCategory.name }}
      </v-tab>
    </v-tabs>
    <v-toolbar>
      <v-col>
        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          dense
          :solo-inverted="!solo"
          :solo="solo"
          @focus="solo = !solo"
          @blur="solo = !solo"
        />
      </v-col>
      <v-col cols="auto">
        <v-tooltip bottom>
          <template #activator="{ on }">
            <v-btn icon small v-on="on" @click="$emit('refetch')">
              <v-icon>
                mdi-refresh
              </v-icon>
            </v-btn>
          </template>
          <span>
            Refresh
          </span>
        </v-tooltip>
      </v-col>
    </v-toolbar>
    <v-tabs-items v-model="tab" class="elevation-5 rounded-b-lg">
      <v-tab-item v-for="matchCategory in matchCategories" :key="matchCategory.name">
        <v-data-table
          :headers="matchCategory.headers"
          :items="matchCategory.contents"
          :loading="loading"
          :loading-text="'Loading your matches...'"
          :search="search"
        >
          <template #no-data>
            {{ matchCategory.fallback }}
          </template>

          <template #[`item.actions`]="{ item }">
            <MatchActionMenu :match="item" />
          </template>

          <template #[`item.event.date`]="{ item }">
            {{
              generateDateRangeFromUnixTimeRange(
                [item.event.date.start, item.event.date.end],
                'DD MMM YYYY',
              )
            }}
          </template>
        </v-data-table>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script lang="ts">
import MatchActionMenu from '@/components/PageComponents/Matches/MatchActionMenu.vue';

import { MatchCategory } from '@/types';
import { generateDateRangeFromUnixTimeRange } from '@/common/utils';
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'MatchesTable',
  components: {
    MatchActionMenu,
  },
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
    const search = ref('');
    const solo = ref(false);

    return {
      tab,
      generateDateRangeFromUnixTimeRange,
      search,
      solo,
    };
  },
});
</script>
