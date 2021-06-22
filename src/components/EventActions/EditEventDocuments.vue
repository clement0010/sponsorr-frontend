<template>
  <v-dialog v-model="dialog" width="500">
    <template #activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title>Upload Document</v-card-title>

      <v-card-text>
        <v-file-input
          v-model="file"
          :value="file"
          outlined
          placeholder="Accepted file formats: .pdf"
          accept=".pdf"
          counter
          chips
          show-size
          :rules="[fileUploadSizeRuleSingle]"
        />
      </v-card-text>

      <v-card-text class="text-right">
        <v-btn class="error" rounded @click="cancel">
          Cancel
        </v-btn>
        <v-btn class="success" rounded :disabled="!file" @click="edit">
          Save
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { fileUploadSizeRuleSingle } from '@/common/validation';
import { uploadFileToStorage } from '@/common';
import useAuth from '@/composable/authComposition';

export default defineComponent({
  name: 'EditEventDocumentButton',
  setup(_, { emit }) {
    const dialog = ref(false);
    const file = ref<File>();

    const { uid } = useAuth();

    const uploadDocument = async () => {
      const url = await uploadFileToStorage(uid.value, file.value);
      if (!url) {
        console.log('Document upload unsuccessful');
        return;
      }
      return url;
    };

    const cancel = () => {
      dialog.value = false;
      file.value = undefined;
    };

    const edit = async () => {
      emit('edit-documents', {
        documents: await uploadDocument(),
      });
      dialog.value = false;
    };

    return {
      dialog,
      file,
      fileUploadSizeRuleSingle,
      cancel,
      edit,
    };
  },
});
</script>
