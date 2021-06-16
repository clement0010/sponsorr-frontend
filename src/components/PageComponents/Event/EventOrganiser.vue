<template>
  <div>
    <v-card-subtitle class="text-h5">
      {{ eventOrganiser }}
    </v-card-subtitle>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'EventOrganiser',
  props: {
    eventOrganiser: {
      type: String,
      default: 'The Foo Bar Society',
    },
  },
});
</script>
