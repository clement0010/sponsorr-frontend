<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template #activator="{ on, attrs }">
      <v-btn icon class="mx-5" v-bind="attrs" v-on="on">
        <v-icon color="black"> mdi-pencil </v-icon>
      </v-btn>
    </template>

    <v-form>
      <v-card>
        <v-card-title>
          <span class="headline"> Edit About </span>
        </v-card-title>

        <v-card-text>
          <v-textarea v-model="input" outlined label="Tell us about your organisation" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn class="error" rounded text @click="cancel"> Cancel </v-btn>
          <v-btn class="success" rounded text @click="edit"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'EditAbout',
  props: {
    about: {
      type: String,
      default: 'Fill in your bio!',
    },
  },
  setup(props, { emit }) {
    const input = ref(props.about);
    const dialog = ref(false); // Dialog is closed by default

    const cancel = () => {
      dialog.value = false; // Closes dialog
    };

    const edit = () => {
      dialog.value = false; // Closes dialog
      emit('edit-about', {
        about: input.value,
      });
    };

    return {
      dialog,
      cancel,
      edit,
      input,
    };
  },
});
</script>
