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
        accept=".pdf"
        chips
        counter
        multiple
        outlined
        placeholder="Accepted file formats: .pdf"
        show-size
        :rules="[fileUploadSizeRule, requireInputRule]"
        @change="uploadFile"
      />

      <v-file-input
        v-model="eventPicture"
        :value="eventPicture"
        outlined
        placeholder="Accepted file formats: .jpg, .png"
        accept=".jpg,.png"
        counter
        chips
        show-size
        :rules="[fileUploadSizeRuleSingle, requireInputRule]"
        @change="uploadPicture"
      />

      <v-card-actions>
        <NewEventCancel @cancel="(message) => $emit('cancel', message)" />
        <v-btn @click="back"> Back </v-btn>
        <NewEventCreate
          :valid="!valid"
          @create="$emit('create', 'Event created successfully')"
          @loading="$emit('loading')"
        />
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

    const eventData = ref<File[]>([]);
    const fileUrl = ref('');
    const eventPicture = ref<File>();
    const pictureUrl = ref('');

    const persist = async () => {
      const localData = JSON.parse(localStorage.getItem('data') || '');
      const data = {
        documents: fileUrl.value,
        picture: pictureUrl.value,
      };
      Object.assign(localData, data);
      localStorage.setItem('data', JSON.stringify(localData));
    };

    const back = () => {
      persist();
      emit('back');
    };

    const uploadFile = async () => {
      try {
        const url = await uploadFileToStorage(uid.value, eventData.value[0]);
        if (!url) {
          console.log('File uploads unsuccessful');
          return;
        }
        console.log(url);
        const localData = JSON.parse(localStorage.getItem('data') || '');
        const data = {
          documents: url,
        };
        Object.assign(localData, data);
        localStorage.setItem('data', JSON.stringify(localData));
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
      eventData,
      eventPicture,

      // Navigation
      back,
      uploadFile,
      uploadPicture,
    };
  },
});
</script>
