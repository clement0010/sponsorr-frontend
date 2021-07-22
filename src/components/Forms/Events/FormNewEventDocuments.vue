<template>
  <v-card>
    <v-card-title>
      Documents
    </v-card-title>

    <v-form v-model="valid">
      <v-card-subtitle>
        Upload up to 5MB of supporting documents such as event pitch, proposals, marketing materials
        etc.
      </v-card-subtitle>
      <v-file-input
        v-model="eventFiles"
        :value="eventFiles"
        accept=".pdf"
        chips
        clearable
        counter
        outlined
        placeholder="Accepted file formats: .pdf"
        show-size
        :rules="[fileUploadSizeRuleSingle]"
        @change="uploadFile"
      />

      <v-card-subtitle>
        Upload your event poster, banner, or art.
      </v-card-subtitle>

      <v-file-input
        v-model="eventPicture"
        :value="eventPicture"
        outlined
        placeholder="Accepted file formats: .jpg, .png"
        accept=".jpg,.png"
        counter
        chips
        clearable
        show-size
        :rules="[fileUploadSizeRuleSingle]"
        @change="uploadPicture"
      />

      <v-card-actions>
        <NewEventCancel @cancel="(message) => $emit('cancel', message)" />
        <v-btn @click="back"> Back </v-btn>
        <NewEventCreate :valid="valid" />
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import useAuth from '@/composable/authComposition';

import {
  fileUploadSizeRule,
  requireInputRule,
  fileUploadSizeRuleSingle,
} from '@/common/validation';
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

    const eventFiles = ref<File>();
    const fileUrls = ref<string[]>([]);

    const eventPicture = ref<File>();
    const pictureUrl = ref('');

    const persist = async () => {
      const cached = JSON.parse(localStorage.getItem('data') || 'null');
      const data = {
        documents: fileUrls.value,
        picture: pictureUrl.value,
      };
      const stored = {
        ...cached,
        ...data,
      };
      localStorage.setItem('data', JSON.stringify(stored));
    };

    const back = () => {
      persist();
      emit('back');
    };

    const uploadFile = async () => {
      try {
        valid.value = false;
        const url = await uploadFileToStorage(uid.value, eventFiles.value);
        if (!url) {
          console.log('File upload unsuccessful');
          return;
        }
        console.log(url);
        const localData = JSON.parse(localStorage.getItem('data') || '');
        const data = {
          documents: [url],
        };
        Object.assign(localData, data);
        localStorage.setItem('data', JSON.stringify(localData));
        fileUrls.value[0] = url;
        valid.value = true;
      } catch (error) {
        console.error(error);
      }
    };

    const uploadPicture = async () => {
      try {
        const url = await uploadFileToStorage(uid.value, eventPicture.value);
        if (!url) {
          console.log('Picture upload unsuccessful');
          return;
        }
        console.log(url);
        const localData = JSON.parse(localStorage.getItem('data') || '');
        const data = {
          picture: url,
        };
        Object.assign(localData, data);
        localStorage.setItem('data', JSON.stringify(localData));
        pictureUrl.value = url;
      } catch (error) {
        console.error(error);
      }
    };

    return {
      // Form validation
      valid,

      // Input validation
      fileUploadSizeRule,
      fileUploadSizeRuleSingle,
      requireInputRule,

      // Payload
      eventFiles,
      eventPicture,

      // Navigation
      back,
      uploadFile,
      uploadPicture,
    };
  },
});
</script>
