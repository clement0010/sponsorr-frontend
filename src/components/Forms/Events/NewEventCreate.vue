<template>
  <v-btn :disabled="disabled" class="success" @click="create"> Create and Publish </v-btn>
</template>

<script lang="ts">
import { generateUnixTime } from '@/common/utility';
import { SponsorEvent } from '@/types';
import { defineComponent } from '@vue/composition-api';
import useEvent from '@/composable/eventComposition';

export default defineComponent({
  name: 'NewEventCreateButton',
  props: {
    disabled: {
      type: Boolean,
      default: true,
    },
  },
  setup(_, { emit }) {
    const { createEvent } = useEvent();

    const create = async () => {
      const newEvent: SponsorEvent = {
        title: localStorage.title,
        description: localStorage.description,
        createdAt: generateUnixTime(),
        date: localStorage.dates.map((date: string) => generateUnixTime(date)),
        venue: localStorage.venue,
        published: true,
        matches: 0,
        views: 0,
        clicks: 0,
      };
      await createEvent(newEvent);
      localStorage.clear();
      emit('create', 'Event created successfully');
    };

    return { create };
  },
});
</script>
