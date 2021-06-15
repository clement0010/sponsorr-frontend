<template>
  <v-btn small @click="viewEvent">
    View
  </v-btn>
</template>

<script lang="ts">
import { SponsorEvent } from '@/types';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'ViewEventButton',
  props: {
    event: {
      type: Object as () => SponsorEvent,
      required: true,
    },
  },
  setup(_, { root }) {
    const viewEvent = () => {
      root.$router.push({
        name: 'Event',
        params: {
          id: '123',
        },
      });
    };

    return { viewEvent };
  },
});
</script>
