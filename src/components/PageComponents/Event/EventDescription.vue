<template>
  <div>
    <v-card-title class="text-h4">
      Description
      <EditEventDescription
        v-if="isOwner"
        :description="description"
        :status="status"
        @edit-description="(payload) => $emit('edit', payload)"
      />
    </v-card-title>
    <v-card-text class="text-body-1 pre-formatted">
      {{ description }}
    </v-card-text>
  </div>
</template>

<script lang="ts">
import EditEventDescription from '@/components/EventActions/EditEventDescription.vue';

import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'EventDescription',
  components: {
    EditEventDescription,
  },
  props: {
    description: {
      type: String,
      default: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
                culpa qui officia deserunt mollit anim id est laborum`,
    },
    isOwner: {
      type: Boolean,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped>
.pre-formatted {
  white-space: pre-line; /* collapse WS, preserve LB */
}

.v-card__text,
.v-card__title {
  word-break: normal; /* maybe !important  */
}
</style>
