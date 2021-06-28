<template>
  <v-btn class="error" @click="$emit('rejectMatch', match)">
    Reject
  </v-btn>
</template>

<script lang="ts">
import { Match } from '@/types';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'MatchReject',
  props: {
    match: {
      type: Object as () => Match,
      required: true,
    },
  },
});
</script>
