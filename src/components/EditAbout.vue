<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon class="mx-5" v-bind="attrs" v-on="on">
        <v-icon color="black">
          mdi-pencil
        </v-icon>
      </v-btn>
    </template>

    <v-form>
      <v-card light>
        <v-card-title>
          <span class="headline">
            Edit About
          </span>
        </v-card-title>

        <v-card-text>
          <v-textarea outlined v-model="input" label="Tell us about your organisation" />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="error" rounded text @click="cancel">
            Cancel
          </v-btn>
          <v-btn class="success" rounded text @click="save">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  setup(props, { emit }) {
    const input = ref('');
    const dialog = ref(false); // Dialog is closed by default

    const cancel = () => {
      dialog.value = false; // Closes dialog
      input.value = '';
    };

    const save = () => {
      dialog.value = false; // Closes dialog
      emit('save', input.value);
      input.value = '';
    };

    return {
      dialog,
      cancel,
      save,
      input,
    };
  },
});
</script>
