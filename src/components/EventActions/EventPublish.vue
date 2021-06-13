<template>
  <v-btn class="success" small @click="$emit('publishEvent', event)">
    Publish
  </v-btn>
</template>

<script lang="ts">
import { SponsorEvent } from '@/types';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'PublishEventButton',
  props: {
    event: {
      type: Object as () => SponsorEvent,
      required: true,
    },
  },
});
</script>
