<template>
  <v-dialog v-model="dialog" width="500" persistent>
    <template #activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" :disabled="status !== 'draft'" v-on="on">
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

      <v-card-text>
        <v-row>
          <v-btn rounded :disabled="!file" @click="clear">
            Clear
          </v-btn>
          <v-spacer />
          <v-btn class="error" rounded @click="cancel">
            Cancel
          </v-btn>
          <v-btn class="success" rounded :disabled="!file" @click="edit">
            Save
          </v-btn>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { fileUploadSizeRuleSingle } from '@/common/validation';
import { uploadFileToStorage } from '@/common';
import useAuth from '@/composable/authComposition';
import { EventGroup } from '@/types/enum';

export default defineComponent({
  name: 'EditEventDocumentButton',
  props: {
    status: {
      type: Object as () => EventGroup,
      required: true,
    },
  },
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
        documents: [await uploadDocument()],
      });
      file.value = undefined;
      dialog.value = false;
    };

    const clear = async () => {
      emit('edit-documents', {
        documents: [],
      });
      file.value = undefined;
      dialog.value = false;
    };

    return {
      dialog,
      file,
      fileUploadSizeRuleSingle,
      cancel,
      edit,
      clear,
    };
  },
});
</script>
