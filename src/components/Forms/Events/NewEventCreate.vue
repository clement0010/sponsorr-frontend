<template>
  <v-btn :disabled="!valid || disable" class="success" @click="create"> Create and Publish </v-btn>
</template>

<script lang="ts">
import { generateUnixTime } from '@/common/utils';
import { SponsorEvent } from '@/types';
import { defineComponent, ref } from '@vue/composition-api';
import useEvent from '@/composable/eventComposition';
import { uid } from '@/composable/store';

export default defineComponent({
  name: 'NewEventCreateButton',
  props: {
    valid: {
      type: Boolean,
      default: true,
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
        picture: data.picture || '',
        status: 'published',
        eventSize: data.eventSize,
        userId: uid.value,
        requests: data.requests,
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
