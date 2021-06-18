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
      const newEvent: SponsorEvent = {
        title: localStorage.getItem('title') || 'No title',
        description: localStorage.getItem('description') || 'No description',
        createdAt: generateUnixTime(),
        date: JSON.parse(localStorage.getItem('dates') || '[]').map((date: string) =>
          generateUnixTime(date),
        ),
        venue: localStorage.getItem('venue') || 'No venue provided',
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
