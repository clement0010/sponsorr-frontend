<template>
  <v-btn class="warning" small @click="$emit('unpublishEvent', event)"> Unpublish </v-btn>
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
