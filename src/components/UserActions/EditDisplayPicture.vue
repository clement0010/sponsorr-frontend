<template>
  <v-dialog :value="dialog" width="500" persistent>
    <v-form>
      <v-card>
        <v-card-title> Edit Display Picture </v-card-title>
        <v-card-text>
          <v-text-field v-model="input" label="Enter Image URL" outlined :rules="[validURLRule]" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn class="error" rounded text @click="cancel"> Cancel </v-btn>
          <v-btn class="success" rounded text @click="edit">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script lang="ts">
import useAuth from '@/composable/authComposition';
import useProfile from '@/composable/profileComposition';

import { validURLRule } from '@/common/validation';

import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'EditDisplayPicture',
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    displayPicture: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { uid } = useAuth();
    const { editUserProfile } = useProfile();
    const { displayPicture } = props;

    const input = ref(displayPicture);

    const cancel = () => {
      emit('toggle');
      input.value = displayPicture;
    };

    const edit = async () => {
      emit('toggle');
      await editUserProfile(uid.value, {
        displayPicture: input.value,
      });
    };

    return {
      input,
      validURLRule,
      edit,
      cancel,
    };
  },
});
</script>
