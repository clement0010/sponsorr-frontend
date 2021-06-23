<template>
  <router-link :to="{ name: 'Event', params: { id: eventId } }">
    <v-btn small>
      View
    </v-btn>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'ViewEventButton',
  props: {
    eventId: {
      type: String,
      required: true,
    },
  },
});
</script>
