<template>
  <v-btn class="success" small @click="publish">
    <v-icon>mdi-check</v-icon>
    Publish Event
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
