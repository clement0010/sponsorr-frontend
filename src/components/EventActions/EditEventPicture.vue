<template>
  <v-dialog :value="dialog" width="500" persistent>
    <v-form>
      <v-card>
        <v-card-title>
          Edit Event Picture
        </v-card-title>

        <v-card-text>
          <v-file-input
            v-model="eventPicture"
            :value="eventPicture"
            outlined
            placeholder="Accepted file formats: .jpg, .png"
            accept=".jpg,.png"
            counter
            chips
            show-size
            :rules="[fileUploadSizeRuleSingle]"
          />
        </v-card-text>

        <v-card-text class="text-right">
          <v-btn class="error" rounded @click="toggle">
            Cancel
          </v-btn>
          <v-btn
            class="success"
            rounded
            :disabled="!eventPicture"
            @click="
              {
                edit();
                toggle();
              }
            "
          >
            Save
          </v-btn>
        </v-card-text>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script lang="ts">
import useAuth from '@/composable/authComposition';

import { fileUploadSizeRuleSingle } from '@/common/validation';
import { uploadFileToStorage } from '@/common';
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'EditEventPicture',
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  setup(_, { emit }) {
    const { uid } = useAuth();

    const eventPicture = ref<File>();

    const uploadPicture = async () => {
      const url = await uploadFileToStorage(uid.value, eventPicture.value);
      if (!url) {
        console.log('Picture upload unsuccessful');
      }
      return url;
    };

    const toggle = () => {
      emit('toggle');
      eventPicture.value = undefined;
    };

    const edit = async () => {
      emit('edit-picture', {
        picture: await uploadPicture(),
      });
      eventPicture.value = undefined;
    };

    return {
      fileUploadSizeRuleSingle,
      eventPicture,
      edit,
      toggle,
    };
  },
});
</script>
