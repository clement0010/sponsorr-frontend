<template>
  <v-btn :disabled="!valid || disable" class="success" @click="create"> Create and Publish </v-btn>
</template>

<script lang="ts">
import useEvent from '@/composable/eventComposition';

import { generateUnixTime } from '@/common/utils';
import { SponsorEvent } from '@/types';
import { defineComponent, ref } from '@vue/composition-api';
import { uid } from '@/composable/store';

export default defineComponent({
  name: 'NewEventCreateButton',
  props: {
    valid: {
      type: Boolean,
      require: true,
    },
  },
  setup(_, { root }) {
    const { createEvent } = useEvent();

    const disable = ref(false);

    const create = async () => {
      disable.value = true;
      const data = JSON.parse(localStorage.getItem('data') || '');

      const newEvent: SponsorEvent = {
        title: data.title,
        description: data.description,
        documents: data.documents || [],
        keywords: data.keywords,
        venue: data.venue,
        budget: data.budget,
        date: {
          start: data.date.start,
          end: data.date.end,
        },
        demographic: data.demographic,
        createdAt: generateUnixTime(),
        matches: 0,
        clicks: 0,
        pairs: 0,
        picture: data.picture || '',
        status: 'published',
        eventSize: data.eventSize,
        userId: uid.value,
        requests: data.requests,
        subscribed: false,
      };
      console.log(newEvent);
      await createEvent(newEvent);
      localStorage.clear();
      disable.value = false;
      root.$router.push({ name: 'Dashboard' });
    };

    return { create, disable };
  },
});
</script>
