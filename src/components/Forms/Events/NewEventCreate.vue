<template>
  <v-btn :disabled="disabled" class="success" @click="create"> Create and Publish </v-btn>
</template>

<script lang="ts">
import { generateUnixTime } from '@/common/utils';
import { SponsorEvent } from '@/types';
import { defineComponent } from '@vue/composition-api';
import useEvent from '@/composable/eventComposition';
import useAuth from '@/composable/authComposition';

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

    const { uid } = useAuth();

    const create = async () => {
      const data = JSON.parse(localStorage.getItem('data') || '');

      const newEvent: SponsorEvent = {
        title: data.title,
        description: data.description,
        documents: data.documents,
        keywords: data.keywords,
        venue: data.venue,
        budget: {
          maximum: data.budget.maximum,
          minimum: data.budget.minimum,
        },
        date: {
          start: data.date.start,
          end: data.date.end,
        },
        demographic: data.demographic,
        createdAt: generateUnixTime(),
        published: true,
        matches: 0,
        clicks: 0,
        views: 0,
        picture: data.picture,
        status: 'published',
        eventSize: data.eventSize,
        userId: uid.value,
      };
      console.log(newEvent);
      emit('loading');
      await createEvent(newEvent);
      localStorage.clear();
      emit('create');
    };

    return { create };
  },
});
</script>
