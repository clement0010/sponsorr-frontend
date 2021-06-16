<template>
  <v-container class="secondary" fluid>
    <v-row justify="center">
      <v-card class="my-10 pa-5" width="1320" rounded="xl">
        <EventTitle :title="event.title" />
        <EventOrganiser />
        <EventDescription :event-description="event.description" />
        <EventDetails
          :event-date="generateDate(event.date, 'DD MMM YYYY')"
          :event-venue="event.venue"
        />
        <EventKeywords :keywords="event.keywords" />
        <EventDocuments />
        <v-card-text class="text-right">
          <EventUnpublish
            v-if="event.matches < 1 && event.published"
            :event="event"
            @unpublishEvent="(payload) => $emit('unpublishEvent', payload)"
          />
          <EventPublish
            v-if="!event.published"
            :event="event"
            @publishEvent="(payload) => $emit('publishEvent', payload)"
          />
          <EventDelete
            v-if="event.matches < 1"
            :event="event"
            @deleteEvent="(payload) => $emit('deleteEvent', payload)"
          />
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import EventTitle from '@/components/PageComponents/Event/EventTitle.vue';
import EventOrganiser from '@/components/PageComponents/Event/EventOrganiser.vue';
import EventDescription from '@/components/PageComponents/Event/EventDescription.vue';
import EventDetails from '@/components/PageComponents/Event/EventDetails.vue';
import EventKeywords from '@/components/PageComponents/Event/EventKeywords.vue';
import EventDocuments from '@/components/PageComponents/Event/EventDocuments.vue';
import { SponsorEvent } from '@/types';
import { generateDate } from '@/common/utils';
import EventDelete from '@/components/EventActions/EventDelete.vue';
import EventPublish from '@/components/EventActions/EventPublish.vue';
import EventUnpublish from '@/components/EventActions/EventUnpublish.vue';

export default defineComponent({
  components: {
    EventTitle,
    EventOrganiser,
    EventDescription,
    EventDetails,
    EventKeywords,
    EventDocuments,
    EventDelete,
    EventPublish,
    EventUnpublish,
  },
  props: {
    event: {
      type: Object as () => SponsorEvent,
      required: true,
    },
  },
  setup() {
    return {
      generateDate,
    };
  },
});
</script>
