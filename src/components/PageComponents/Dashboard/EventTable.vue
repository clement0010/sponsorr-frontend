<template>
  <v-container fluid>
    <v-tabs v-model="group" class="elevation-3">
      <v-tabs-slider color="blue" />
      <v-tab v-for="(eventGroup, index) in eventGroups" :key="index">
        {{ eventGroup.group }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="group" class="elevation-3">
      <v-tab-item v-for="(eventGroup, index) in eventGroups" :key="index">
        <v-data-table :headers="eventGroup.headers" :items="eventGroup.content">
          <template #no-data>
            {{ eventGroup.fallback }}
          </template>
          <template #[`item.actions`]="{ item }">
            <EventPublish
              v-if="eventGroup.group === 'Drafts'"
              :event="item"
              @publish="(payload) => $emit('publish', payload)"
            />
            <EventDelete
              :event-title="item.title"
              @deleteEvent="(payload) => $emit('deleteEvent', payload)"
            />
          </template>
        </v-data-table>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script lang="ts">
import EventDelete from '@/components/UserActions/EventDelete.vue';
import EventPublish from '@/components/UserActions/EventPublish.vue';
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'EventTable',
  components: {
    EventPublish,
    EventDelete,
  },
  props: {
    eventData: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const group = ref(null);

    const { eventData: eventGroups } = props;

    return { eventGroups, group };
  },
});
</script>
