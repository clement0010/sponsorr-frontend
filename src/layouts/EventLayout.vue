<template>
  <v-container class="secondary" fluid>
    <v-row justify="center">
      <v-card class="my-10 pa-5" width="1320" rounded="xl">
        <EventPicture :picture="event.picture" @edit="(payload) => $emit('edit', payload)" />
        <EventTitle :title="event.title" @edit="(payload) => $emit('edit', payload)" />
        <EventOrganiser v-if="!loading" :user="profile.name" />
        <EventDescription
          :description="event.description"
          @edit="(payload) => $emit('edit', payload)"
        />
        <EventDetails
          :venue="event.venue"
          :event-size="event.eventSize"
          :time-start="event.date.start"
          :time-end="event.date.end"
          @edit="(payload) => $emit('edit', payload)"
        />
        <EventKeywords :keywords="event.keywords" @edit="(payload) => $emit('edit', payload)" />
        <EventDocuments :documents="event.documents" @edit="(payload) => $emit('edit', payload)" />
        <v-card-text class="text-right">
          <EventUnpublish
            v-if="event.matches < 1 && event.published"
            :event="event"
            @publishEvent="(payload) => $emit('publishEvent', payload)"
          />
          <EventPublish
            v-if="!event.published"
            :event="event"
            @publishEvent="(payload) => $emit('publishEvent', payload)"
          />
          <EventDelete
            v-if="event.matches < 1"
            :event-id="eventId"
            :title="event.title"
            @deleteEvent="(payload) => $emit('deleteEvent', payload)"
          />
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api';
import { SponsorEvent } from '@/types';
import { generateDate } from '@/common/utils';

import EventTitle from '@/components/PageComponents/Event/EventTitle.vue';
import EventOrganiser from '@/components/PageComponents/Event/EventOrganiser.vue';
import EventDescription from '@/components/PageComponents/Event/EventDescription.vue';
import EventDetails from '@/components/PageComponents/Event/EventDetails.vue';
import EventKeywords from '@/components/PageComponents/Event/EventKeywords.vue';
import EventDocuments from '@/components/PageComponents/Event/EventDocuments.vue';
import EventDelete from '@/components/EventActions/EventDelete.vue';
import EventPublish from '@/components/EventActions/EventPublish.vue';
import EventUnpublish from '@/components/EventActions/EventUnpublish.vue';
import EventPicture from '@/components/PageComponents/Event/EventPicture.vue';
import useProfile from '@/composable/profileComposition';

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
    EventPicture,
  },
  props: {
    event: {
      type: Object as () => SponsorEvent,
      required: true,
    },
  },
  setup(props, { root }) {
    const eventId = root.$route.params.id;
    const { event } = props;
    const { fetchUserProfile, profile, loading } = useProfile();

    onMounted(async () => {
      await fetchUserProfile(event.userId);
    });

    return {
      generateDate,
      eventId,
      profile,
      loading,
    };
  },
});
</script>
