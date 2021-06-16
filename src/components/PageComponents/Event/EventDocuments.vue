<template>
  <div>
    <v-card-title class="text-h4">
      Documents
      <EditEventDocuments />
    </v-card-title>
    <v-list v-if="eventDocuments.length > 0">
      <v-list-item v-for="(eventDocument, index) in eventDocuments" :key="index">
        {{ eventDocument }}
      </v-list-item>
    </v-list>
    <v-card-text v-else>
      No documents
    </v-card-text>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import EditEventDocuments from '@/components/EventActions/EditEventDocuments.vue';

export default defineComponent({
  name: 'EventDocuments',
  components: {
    EditEventDocuments,
  },
  props: {
    eventDocuments: {
      type: Array as () => File[],
      default: () => [],
    },
  },
});
</script>
