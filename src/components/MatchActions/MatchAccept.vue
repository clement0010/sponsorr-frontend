<template>
  <v-btn class="success" @click="$emit('acceptMatch', match)">
    Accept
  </v-btn>
</template>

<script lang="ts">
import { Match } from '@/types';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'MatchAccept',
  props: {
    match: {
      type: Object as () => Match,
      required: true,
    },
  },
});
</script>
