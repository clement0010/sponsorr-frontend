<template>
  <v-container fluid>
    <v-tabs v-model="group">
      <v-tabs-slider color="blue" />
      <v-tab v-for="(eventGroup, index) in eventGroups" :key="index">
        {{ eventGroup.group }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="group">
      <v-tab-item v-for="(eventGroup, index) in eventGroups" :key="index">
        <v-data-table :headers="eventGroup.headers" :items="eventGroup.content">
          <template #no-data>
            {{ eventGroup.fallback }}
          </template>
          <template v-if="eventGroup.group === 'Drafts'" #[`item.actions`]="{ item }">
            <EventPublish :event="item" @publish="(payload) => $emit('publish', payload)" />
          </template>
        </v-data-table>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script lang="ts">
import EventPublish from '@/components/UserActions/EventPublish.vue';
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'EventTable',
  components: {
    EventPublish,
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
