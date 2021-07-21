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

    <v-tabs-items v-model="tab" class="elevation-5 rounded-b-lg">
      <v-tab-item v-for="eventCategory in eventCategories" :key="eventCategory.name">
        <v-data-table
          :headers="eventCategory.headers"
          :items="eventCategory.contents"
          :loading="loading"
          :loading-text="'Loading your events...'"
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

    return {
      tab,
      generateDateRangeFromUnixTimeRange,
      EventGroup,
    };
  },
});
</script>
