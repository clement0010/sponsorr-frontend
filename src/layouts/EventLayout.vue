<template>
  <v-container class="secondary" fluid>
    <v-row justify="center">
      <v-card class="my-10 pa-5" width="1320" rounded="xl">
        <EventTitle />
        <EventOrganiser />
        <EventDescription />
        <EventDetails />
        <EventKeywords />
        <EventDocuments />
        <v-card-text class="text-right">
          <v-btn class="error">
            Delete Event
          </v-btn>
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

export default defineComponent({
  components: {
    EventTitle,
    EventOrganiser,
    EventDescription,
    EventDetails,
    EventKeywords,
    EventDocuments,
  },
  props: {
    event: {
      type: Object as () => SponsorEvent,
      required: true,
    },
  },
});
</script>
