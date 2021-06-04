<template>
  <v-btn class="warning" @click="unpublish"> Unpublish Event </v-btn>
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
    const unpublish = (): void => {
      event.published = false;
      emit('unpublish', 'Event unpublished');
    };
    return { unpublish };
  },
});
</script>
