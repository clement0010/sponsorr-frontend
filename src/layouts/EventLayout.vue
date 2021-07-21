<template>
  <v-container class="secondary" fluid>
    <v-row justify="center">
      <v-card class="my-10 pa-5" width="1320" rounded="md">
        <EventPicture
          :picture="picture"
          :is-owner="isOwner"
          :status="status"
          @edit="(payload) => $emit('edit', payload)"
        />
        <EventTitle
          :title="title"
          :status="status"
          :is-owner="isOwner"
          @edit="(payload) => $emit('edit', payload)"
        />
        <EventOrganiser
          :user="name"
          :is-owner="isOwner"
          :owner-id="ownerId"
          :matches="matches"
          :subscribed="subscribed"
          :event="event"
          @edit="(payload) => $emit('edit', payload)"
          @publishEvent="(payload) => $emit('publishEvent', payload)"
        />
        <v-tabs v-model="tabs">
          <v-tab>
            Details
          </v-tab>
          <v-tab v-if="isOwner">
            Matches
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tabs">
          <v-tab-item :value="0">
            <EventDescription
              :description="description"
              :is-owner="isOwner"
              :status="status"
              @edit="(payload) => $emit('edit', payload)"
            />
            <EventDetails
              :venue="venue"
              :event-size="eventSize"
              :time-start="timeStart"
              :time-end="timeEnd"
              :is-owner="isOwner"
              :status="status"
              @edit="(payload) => $emit('edit', payload)"
            />
            <EventKeywords
              :keywords="keywords"
              :is-owner="isOwner"
              :status="status"
              @edit="(payload) => $emit('edit', payload)"
            />
            <EventDocuments
              :documents="documents"
              :is-owner="isOwner"
              :status="status"
              @edit="(payload) => $emit('edit', payload)"
            />
            <EventRequests
              :requests="event.requests"
              :is-owner="isOwner"
              :status="status"
              @edit="(payload) => $emit('edit', payload)"
            />
          </v-tab-item>
          <v-tab-item v-if="isOwner" :value="1">
            <EventMatchesTable :event="event" :event-id="eventId" :matches="matches" />
          </v-tab-item>
        </v-tabs-items>
        <v-divider />
        <v-card-text class="text-right">
          <EventDelete
            v-if="event.pairs < 1 && isOwner"
            :status="status"
            :event-id="eventId"
            :title="event.title"
            @deleteEvent="(payload) => $emit('deleteEvent', payload)"
          />
          <EventApply
            v-if="role === 'Sponsor'"
            :event-id="eventId"
            :owner-id="ownerId"
            :disabled="matches.length > 0"
            @refetch="$emit('refetch')"
          />
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script lang="ts">
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
import EventRequests from '@/components/PageComponents/Event/EventRequests.vue';

import { computed, defineComponent, ref, toRefs } from '@vue/composition-api';
import { Matches, Role, SponsorEvent } from '@/types';
import { generateDate } from '@/common/utils';

export default defineComponent({
  components: {
    EventTitle,
    EventOrganiser,
    EventDescription,
    EventDetails,
    EventKeywords,
    EventDocuments,
    EventDelete,
    EventPicture,
    EventApply,
    EventRequests,
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
    isOwner: {
      type: Boolean,
      required: true,
    },
    role: {
      type: String as () => Role,
      required: true,
    },
    name: {
      type: String,
      default: '',
    },
    matches: {
      type: Array as () => Matches,
      default: () => [],
    },
  },
  setup(props) {
    const { event } = toRefs(props);

    const tabs = ref(0);

    return {
      picture: computed(() => event.value.picture),
      title: computed(() => event.value.title),
      venue: computed(() => event.value.venue),
      description: computed(() => event.value.description),
      eventSize: computed(() => event.value.eventSize),
      timeStart: computed(() => event.value.date.start),
      timeEnd: computed(() => event.value.date.end),
      keywords: computed(() => event.value.keywords),
      documents: computed(() => event.value.documents),
      ownerId: computed(() => event.value.userId),
      subscribed: computed(() => event.value.subscribed),
      status: computed(() => event.value.status),
      generateDate,
      tabs,
    };
  },
});
</script>
