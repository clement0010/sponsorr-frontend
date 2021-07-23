<template>
  <div>
    <v-row class="ma-0">
      <v-col cols="auto" class="pa-0">
        <v-card-subtitle class="text-h5">
          {{ user }}
        </v-card-subtitle>
      </v-col>
      <v-spacer />
      <v-col v-if="isOwner && event.pairs < 1" cols="auto">
        <EventUnpublish
          v-if="event.status === 'published'"
          @publishEvent="$emit('publishEvent', { status: 'draft', subscribed: false })"
        />
        <EventPublish
          v-if="event.status === 'draft'"
          @publishEvent="$emit('publishEvent', { status: 'published', subscribed: true })"
        />
      </v-col>
      <v-col v-if="isOwner && event.status !== 'draft'" cols="auto">
        <v-btn :class="{ success: !subscribed }" @click="subscribeToggle">
          {{ subscribed ? 'Disable Matching' : 'Enable Matching' }}
        </v-btn>
      </v-col>
      <v-col v-if="!isOwner" cols="auto">
        <router-link :to="{ name: 'Profile', params: { id: ownerId } }">
          <v-btn>
            View Event Organiser
          </v-btn>
        </router-link>
      </v-col>
      <v-col v-if="!isOwner && matches.length > 0" cols="auto">
        <MatchView :messages="match.messages" :is-owner="isOwner" />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import EventPublish from '@/components/EventActions/EventPublish.vue';
import EventUnpublish from '@/components/EventActions/EventUnpublish.vue';
import MatchView from '@/components/MatchActions/MatchView.vue';

import { Matches, SponsorEvent } from '@/types';
import { computed, defineComponent, toRefs } from '@vue/composition-api';

export default defineComponent({
  name: 'EventOrganiser',
  components: {
    MatchView,
    EventPublish,
    EventUnpublish,
  },
  props: {
    user: {
      type: String,
      required: true,
    },
    isOwner: {
      type: Boolean,
      default: true,
    },
    ownerId: {
      type: String,
      default: '',
    },
    matches: {
      type: Array as () => Matches,
      required: true,
    },
    subscribed: {
      type: Boolean,
      required: true,
    },
    event: {
      type: Object as () => SponsorEvent,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { matches, subscribed } = toRefs(props);

    const subscribeToggle = () => {
      emit('edit', {
        subscribed: !subscribed.value,
      });
    };

    return {
      match: computed(() => (matches.value.length === 0 ? {} : matches.value[0])),
      subscribeToggle,
    };
  },
});
</script>
