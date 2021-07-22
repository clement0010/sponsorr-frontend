<template>
  <v-container fluid>
    <v-tabs v-model="tab" class="elevation-5 rounded-t-lg" grow>
      <v-tabs-slider color="accent1" />
      <v-tab
        v-for="eventCategory in eventCategories"
        :key="eventCategory.name"
        @click="$emit('fetchEvents', eventCategory)"
      >
        {{ eventCategory.name }}
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
      <v-tab-item v-for="eventCategory in eventCategories" :key="eventCategory.name">
        <v-data-table
          :headers="eventCategory.headers"
          :items="eventCategory.contents"
          :loading="loading"
          :loading-text="'Loading your events...'"
          :search="search"
        >
          <template #no-data>
            {{ eventCategory.fallback }}
          </template>

          <template #[`item.actions`]="{ item }">
            <EventActionMenu
              :event-category="eventCategory"
              :event="item"
              @unpublishEvent="(payload) => $emit('unpublishEvent', payload)"
              @publishEvent="(payload) => $emit('publishEvent', payload)"
              @deleteEvent="(payload) => $emit('deleteEvent', payload)"
            />
          </template>

          <template #[`item.date`]="{ item }">
            {{
              generateDateRangeFromUnixTimeRange([item.date.start, item.date.end], 'DD MMM YYYY')
            }}
          </template>
        </v-data-table>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script lang="ts">
import EventActionMenu from '@/components/PageComponents/Dashboard/EventActionMenu.vue';

import { EventCategory } from '@/types';
import { EventGroup } from '@/types/enum';
import { defineComponent, ref } from '@vue/composition-api';
import { generateDateRangeFromUnixTimeRange } from '@/common/utils';

export default defineComponent({
  name: 'EventTable',
  components: {
    EventActionMenu,
  },
  props: {
    eventCategories: {
      type: Array as () => EventCategory[],
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    // Tab switching
    const tab = ref(null);
    const search = ref('');
    const solo = ref(false);

    return {
      tab,
      search,
      generateDateRangeFromUnixTimeRange,
      EventGroup,
      solo,
    };
  },
});
</script>
