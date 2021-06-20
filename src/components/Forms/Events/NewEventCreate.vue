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
        ...data,
        budget: {
          maximum: 1000,
          minimum: 500,
        },
        date: {
          start: 1622829222,
          end: 1622829222,
        },
        demographic: ['Adult'],
        createdAt: generateUnixTime(),
        published: true,
        matches: 0,
        clicks: 0,
        views: 0,
        picture:
          'https://firebasestorage.googleapis.com/v0/b/sponsorr-dev.appspot.com/o/public_assets%2Ficon-profile.svg?alt=media&token=1ddcee8a-2889-43a1-aecd-a8959474814d',
        status: 'published',
        eventSize: 0,
        userId: uid.value,
      };
      console.log(newEvent);
      await createEvent(newEvent);
      localStorage.clear();
      emit('create', 'Event created successfully');
    };

    return { create };
  },
});
</script>
