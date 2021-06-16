<template>
  <router-link :to="{ name: 'Event', params: { id: '123' } }">
    <v-btn small>
      View
    </v-btn>
  </router-link>
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
});
</script>
