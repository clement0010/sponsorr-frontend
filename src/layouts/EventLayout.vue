<template>
  <v-container class="secondary" fluid>
    <v-row justify="center">
      <v-card class="my-10 pa-5" width="1320" rounded="xl">
        <EventPicture
          :picture="event.picture"
          :is-owner="isOwner"
          @edit="(payload) => $emit('edit', payload)"
        />
        <EventTitle
          :title="event.title"
          :is-owner="isOwner"
          @edit="(payload) => $emit('edit', payload)"
        />
        <EventOrganiser v-if="!loading" :user="profile.name" />
        <EventDescription
          :description="event.description"
          :is-owner="isOwner"
          @edit="(payload) => $emit('edit', payload)"
        />
        <EventDetails
          :venue="event.venue"
          :event-size="event.eventSize"
          :time-start="event.date.start"
          :time-end="event.date.end"
          :is-owner="isOwner"
          @edit="(payload) => $emit('edit', payload)"
        />
        <EventKeywords
          :keywords="event.keywords"
          :is-owner="isOwner"
          @edit="(payload) => $emit('edit', payload)"
        />
        <EventDocuments
          :documents="event.documents"
          :is-owner="isOwner"
          @edit="(payload) => $emit('edit', payload)"
        />
        <EventMatchesTable
          v-if="isOwner"
          :matches="matches"
          @acceptMatch="(payload) => $emit('acceptMatch', payload)"
          @rejectMatch="(payload) => $emit('rejectMatch', payload)"
        />
        <v-card-text class="text-right">
          <EventUnpublish
            v-if="event.matches < 1 && event.published && isOwner"
            :event="event"
            @publishEvent="$emit('publishEvent', { status: 'draft', published: false })"
          />
          <EventPublish
            v-if="!event.published && isOwner"
            :event="event"
            @publishEvent="$emit('publishEvent', { status: 'published', published: true })"
          />
          <EventDelete
            v-if="event.matches < 1 && isOwner"
            :event-id="eventId"
            :title="event.title"
            @deleteEvent="(payload) => $emit('deleteEvent', payload)"
          />
          <EventApply v-if="role === 'Sponsor'" @apply="(input) => $emit('apply', input)" />
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { Matches, Profile, Role, SponsorEvent } from '@/types';
import { generateDate } from '@/common/utils';

import EventApply from '@/components/EventActions/EventApply.vue';
import EventDetails from '@/components/PageComponents/Event/EventDetails.vue';
import EventDelete from '@/components/EventActions/EventDelete.vue';
import EventDescription from '@/components/PageComponents/Event/EventDescription.vue';
import EventDocuments from '@/components/PageComponents/Event/EventDocuments.vue';
import EventKeywords from '@/components/PageComponents/Event/EventKeywords.vue';
import EventTitle from '@/components/PageComponents/Event/EventTitle.vue';
import EventMatchesTable from '@/components/PageComponents/Event/EventMatchesTable.vue';
import EventOrganiser from '@/components/PageComponents/Event/EventOrganiser.vue';
import EventPicture from '@/components/PageComponents/Event/EventPicture.vue';
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
    EventPicture,
    EventApply,
    EventMatchesTable,
  },
  props: {
    event: {
      type: Object as () => SponsorEvent,
      required: true,
    },
    eventId: {
      type: String,
      required: true,
    },
    matches: {
      type: Array as () => Matches,
      required: true,
    },
    isOwner: {
      type: Boolean,
      required: true,
    },
    role: {
      type: String as () => Role,
      required: true,
    },
    profile: {
      type: Object as () => Profile,
      required: true,
    },
    loading: {
      type: Boolean,
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
