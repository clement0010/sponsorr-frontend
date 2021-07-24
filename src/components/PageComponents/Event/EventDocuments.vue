<template>
  <div>
    <v-card-title class="text-h4">
      Documents
      <EditEventDocuments
        v-if="isOwner && status === 'draft'"
        @edit-documents="(payload) => $emit('edit', payload)"
      />
    </v-card-title>
    <v-card-text>
      <span v-if="documents.length === 0">
        No uploaded documents
      </span>
      <div v-for="(document, index) in documents" v-else :key="index">
        <v-icon>
          mdi-file
        </v-icon>
        <a :href="document" target="_blank">
          Link to document
        </a>
      </div>
    </v-card-text>
  </div>
</template>

<script lang="ts">
import EditEventDocuments from '@/components/EventActions/EditEventDocuments.vue';

import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'EventDocuments',
  components: {
    EditEventDocuments,
  },
  props: {
    documents: {
      type: Array as () => string[],
      default: () => [],
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
