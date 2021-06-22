<template>
  <v-dialog :value="dialog" width="500">
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
import { defineComponent, ref } from '@vue/composition-api';
import { fileUploadSizeRuleSingle } from '@/common/validation';
import useAuth from '@/composable/authComposition';
import { uploadFileToStorage } from '@/common';

export default defineComponent({
  name: 'EditEventPictureButton',
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  setup(_, { emit }) {
    const eventPicture = ref<File>();
    const { uid } = useAuth();

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
