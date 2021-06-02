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
  setup(props) {
    const { event } = props;
    const publish = (): void => {
      console.log('Publishing event');
      event.published = true;
    };
    return { publish };
  },
});
</script>
