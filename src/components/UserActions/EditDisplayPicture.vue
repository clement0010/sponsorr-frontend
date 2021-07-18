<template>
  <v-dialog :value="dialog" width="500" persistent>
    <v-form>
      <v-card>
        <v-card-title>
          Edit Display Picture
        </v-card-title>

        <v-card-text>
          <v-file-input
            v-model="userPicture"
            :value="userPicture"
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
          <v-btn class="error" rounded text @click="toggle">
            Cancel
          </v-btn>
          <v-btn class="success" rounded :disabled="!userPicture" text @click="edit">
            Save
          </v-btn>
        </v-card-text>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script lang="ts">
import useAuth from '@/composable/authComposition';
import useProfile from '@/composable/profileComposition';

import { fileUploadSizeRuleSingle } from '@/common/validation';

import { defineComponent, ref } from '@vue/composition-api';
import { uploadFileToStorage } from '@/common';

export default defineComponent({
  name: 'EditDisplayPicture',
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  setup(_, { emit }) {
    const { uid } = useAuth();
    const { editUserProfile } = useProfile();

    const userPicture = ref<File>();

    const uploadPicture = async () => {
      const url = await uploadFileToStorage(uid.value, userPicture.value);
      if (!url) {
        console.log('Picture upload unsuccessful');
      }
      return url;
    };

    const toggle = () => {
      emit('toggle');
      userPicture.value = undefined;
    };

    const edit = async () => {
      await editUserProfile(uid.value, {
        displayPicture: await uploadPicture(),
      });
      userPicture.value = undefined;
      emit('toggle');
    };

    return {
      userPicture,
      fileUploadSizeRuleSingle,
      edit,
      toggle,
    };
  },
});
</script>
