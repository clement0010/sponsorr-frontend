<template>
  <div>
    <v-card-title class="text-h2">
      {{ title }}
      <EditEventTitle />
    </v-card-title>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import EditEventTitle from '@/components/EventActions/EditEventTitle.vue';

export default defineComponent({
  name: 'EventTitle',
  components: {
    EditEventTitle,
  },
  props: {
    title: {
      type: String,
      default: 'Some Default Event',
    },
  },
});
</script>
