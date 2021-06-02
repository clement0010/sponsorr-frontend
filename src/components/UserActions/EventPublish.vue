<template>
  <v-btn class="success" @click="publish">
    <v-icon>mdi-check</v-icon>
    Publish Event
  </v-btn>
</template>

<script lang="ts">
import { SponsorrEvent } from '@/types';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'PublishEventButton',
  props: {
    event: {
      type: Object as () => SponsorrEvent,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { event } = props;
    const publish = (): void => {
      event.published = true;
      emit('publish', 'Event published successfully');
    };
    return { publish };
  },
});
</script>
