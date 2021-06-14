<template>
  <v-container fluid>
    <v-tabs v-model="tab" class="elevation-3" grow>
      <v-tabs-slider color="blue" />
      <v-tab
        v-for="eventCategory in eventCategories"
        :key="eventCategory.name"
        @click="$emit('fetchEvents', eventCategory)"
      >
        {{ eventCategory.name }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
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
            <EventUnpublish
              v-if="eventCategory.name !== 'Drafts'"
              :event="item"
              @unpublishEvent="(payload) => $emit('unpublishEvent', payload)"
            />
            <EventPublish
              v-if="eventCategory.name === 'Drafts'"
              :event="item"
              @publishEvent="(payload) => $emit('publishEvent', payload)"
            />
            <EventDelete
              :event="item"
              @deleteEvent="
                (payload) => $emit('deleteEvent', Object.assign(payload, { eventCategory }))
              "
            />
          </template>

          <template #[`item.date`]="{ item }">
            {{ generateDate(item.date, 'DD MMM') }}
          </template>
        </v-data-table>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script lang="ts">
import EventDelete from '@/components/EventActions/EventDelete.vue';
import EventPublish from '@/components/EventActions/EventPublish.vue';
import EventUnpublish from '@/components/EventActions/EventUnpublish.vue';
import { EventCategory } from '@/types';
import { defineComponent, ref } from '@vue/composition-api';
import { generateDate } from '@/common/utils';

export default defineComponent({
  name: 'EventTable',
  components: {
    EventDelete,
    EventPublish,
    EventUnpublish,
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

    return { tab, generateDate };
  },
});
</script>
