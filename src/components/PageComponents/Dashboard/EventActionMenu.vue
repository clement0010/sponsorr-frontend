<template>
  <v-menu>
    <template #activator="{on, attrs}">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item v-if="eventCategory.name === EventGroup.Draft">
        <EventPublish :event="event" @publishEvent="(payload) => $emit('publishEvent', payload)" />
      </v-list-item>
      <v-list-item v-if="eventCategory.name === EventGroup.Published">
        <EventUnpublish
          :event="event"
          @unpublishEvent="(payload) => $emit('unpublishEvent', payload)"
        />
      </v-list-item>
      <v-list-item v-if="eventCategory.name !== EventGroup.Matched">
        <EventDelete
          :event="event"
          @deleteEvent="
            (payload) => $emit('deleteEvent', Object.assign(payload, { eventCategory }))
          "
        />
      </v-list-item>
      <v-list-item>
        <EventView :event="event" />
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import EventDelete from '@/components/EventActions/EventDelete.vue';
import EventPublish from '@/components/EventActions/EventPublish.vue';
import EventUnpublish from '@/components/EventActions/EventUnpublish.vue';
import EventView from '@/components/EventActions/EventView.vue';
import { EventCategory, SponsorEvent } from '@/types';
import { EventGroup } from '@/types/enum';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  components: {
    EventPublish,
    EventUnpublish,
    EventDelete,
    EventView,
  },
  props: {
    event: {
      type: Object as () => SponsorEvent,
      required: true,
    },
    eventCategory: {
      type: Object as () => EventCategory,
      required: true,
    },
  },
  setup() {
    return { EventGroup };
  },
});
</script>
