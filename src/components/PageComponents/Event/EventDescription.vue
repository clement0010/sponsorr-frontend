<template>
  <div>
    <v-card-title class="text-h4">
      Description
      <EditEventDescription
        v-if="isOwner"
        :description="description"
        @edit-description="(payload) => $emit('edit', payload)"
      />
    </v-card-title>
    <v-card-text class="text-body-1">
      {{ description }}
    </v-card-text>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import EditEventDescription from '@/components/EventActions/EditEventDescription.vue';

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
  },
});
</script>
