<template>
  <router-link :to="{ name: 'Event', params: { id: eventId } }" data-cy="event-view-button">
    <v-btn :small="small" :text="text" :class="classes">
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
    small: {
      type: Boolean,
      default: true,
    },
    text: {
      type: Boolean,
      default: false,
    },
    classes: {
      type: String,
      default: '',
    },
  },
});
</script>
