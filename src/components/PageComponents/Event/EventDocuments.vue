<template>
  <div>
    <v-card-title class="text-h4">
      Documents
      <EditEventDocuments v-if="isOwner" @edit-documents="(payload) => $emit('edit', payload)" />
    </v-card-title>
    <v-card-text>
      <v-icon>mdi-file</v-icon>
      <a :href="documents">Link to document</a>
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
    documents: {
      type: String,
      required: true,
    },
    isOwner: {
      type: Boolean,
      required: true,
    },
  },
});
</script>
