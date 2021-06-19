<template>
  <v-btn :disabled="disabled" class="success" @click="create"> Create and Publish </v-btn>
</template>

<script lang="ts">
import { generateUnixTime } from '@/common/utils';
import { SponsorEvent } from '@/types';
import { defineComponent } from '@vue/composition-api';
import useDashboard from '@/composable/dashboardComposition';

export default defineComponent({
  name: 'NewEventCreateButton',
  props: {
    disabled: {
      type: Boolean,
      default: true,
    },
  },
  setup(_, { emit }) {
    const { createEvent } = useDashboard();

    const create = async () => {
      const data = JSON.parse(localStorage.getItem('data') || '');

      const newEvent: SponsorEvent = {
        ...data,
        createdAt: generateUnixTime(),
        published: true,
        matches: 0,
        views: 0,
        clicks: 0,
        status: 'draft',
        timeStart: 0,
        timeEnd: 0,
        attendance: 0,
      };
      await createEvent(newEvent);
      localStorage.clear();
      emit('create', 'Event created successfully');
    };

    return { create };
  },
});
</script>
