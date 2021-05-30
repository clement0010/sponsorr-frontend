<template>
  <v-dialog
    v-model="dialog"
    max-width="600px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        icon
        class="mx-5"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon color="black">
          mdi-pencil
        </v-icon>
      </v-btn>
    </template>
    <v-form>
      <v-card light>
        <v-card-title>
          Edit Display Picture
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="input"
            label="Enter Image URL"
            outlined
            :rules="[validURLRule]"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            class="error"
            rounded
            text
            @click="cancel"
          >
            Cancel
          </v-btn>
          <v-btn
            class="success"
            rounded
            text
            @click="edit"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { validURLRule } from '@/common/validation';

export default defineComponent({
  name: 'EditDisplayPicture',
  props: {
    urlPic: {
      type: String,
    },
  },
  setup(props, { emit }) {
    const input = ref(props.urlPic);
    const dialog = ref(false); // Dialog is closed by default

    const cancel = () => {
      dialog.value = false; // Closes dialog
    };

    const edit = () => {
      dialog.value = false; // Closes dialog
      emit('edit-display-picture', {
        displayPicture: input.value,
      });
    };

    return {
      dialog,
      cancel,
      edit,
      input,
      validURLRule,
    };
  },

});
</script>
