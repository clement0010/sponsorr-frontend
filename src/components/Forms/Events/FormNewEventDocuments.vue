<template>
  <v-card>
    <v-card-title> Documents </v-card-title>
    <v-card-subtitle>
      Upload up to 5MB of supporting documents such as event pitch, proposals, marketing materials
      etc.
    </v-card-subtitle>

    <v-form v-model="valid">
      <v-file-input
        v-model="eventData"
        :value="eventData"
        accept=".docx,.pdf,.jpg,.png"
        chips
        counter
        multiple
        outlined
        placeholder="Accepted file formats: .pdf, .docx, .jpg, .png"
        show-size
        :rules="[fileUploadSizeRule, requireInputRule]"
        @change="uploadFile"
      />

      <v-card-actions>
        <NewEventCancel @cancel="(message) => $emit('cancel', message)" />
        <v-btn @click="back"> Back </v-btn>
        <NewEventCreate :disabled="!valid" @create="(message) => $emit('create', message)" />
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import useAuth from '@/composable/authComposition';

import { fileUploadSizeRule, requireInputRule } from '@/common/validation';
import { uploadFileToStorage } from '@/common';
import NewEventCancel from './NewEventCancel.vue';
import NewEventCreate from './NewEventCreate.vue';

export default defineComponent({
  name: 'FormNewEventDocuments',
  components: {
    NewEventCancel,
    NewEventCreate,
  },
  setup(_, { emit }) {
    const valid = ref(false);
    const { uid } = useAuth();

    const eventData = ref<File[]>([]);
    const fileUrl = ref('');

    const persist = async () => {
      const localData = JSON.parse(localStorage.getItem('data') || '');
      const data = {
        documents: fileUrl.value,
      };
      Object.assign(localData, data);
      localStorage.setItem('data', JSON.stringify(localData));
    };

    const back = () => {
      persist();
      emit('back');
    };

    const uploadFile = async () => {
      const url = await uploadFileToStorage(uid.value, eventData.value[0]);
      if (!url) {
        console.log('File uploads unsuccessful');
        return;
      }
      const localData = JSON.parse(localStorage.getItem('data') || '');
      const data = {
        documents: url,
      };
      Object.assign(localData, data);
      localStorage.setItem('data', JSON.stringify(localData));
    };

    return {
      // Form validation
      valid,

      // Input validation
      fileUploadSizeRule,
      requireInputRule,

      // Payload
      eventData,

      // Navigation
      back,
      uploadFile,
    };
  },
});
</script>
