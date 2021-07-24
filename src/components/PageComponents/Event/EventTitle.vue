<template>
  <div>
    <v-card-title class="text-sm-h3 text-h4 text-wrap">
      {{ title }}
      <EditEventTitle
        v-if="isOwner && status === 'draft'"
        :title="title"
        @edit-title="(payload) => $emit('edit', payload)"
      />
    </v-card-title>
  </div>
</template>

<script lang="ts">
import EditEventTitle from '@/components/EventActions/EditEventTitle.vue';

import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'EventTitle',
  components: {
    EditEventTitle,
  },
  props: {
    isOwner: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: 'Some Default Event',
    },
    status: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped>
.v-card__text,
.v-card__title {
  word-break: normal; /* maybe !important  */
}
</style>
