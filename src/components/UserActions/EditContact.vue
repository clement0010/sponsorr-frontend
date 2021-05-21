<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon class="mx-5" v-bind="attrs" v-on="on">
        <v-icon color="black">
          mdi-pencil
        </v-icon>
      </v-btn>
    </template>

    <v-form ref="form" v-model="valid">
      <v-card light>
        <v-card-title>
          <span class="headline">
            Edit Contact Details
          </span>
        </v-card-title>

        <v-card-text>
          <v-text-field
            outlined
            v-model="payload.link"
            label="Link to Website"
            :rules="[validURLRule]"
          />

          <v-text-field
            outlined
            v-model="payload.location"
            label="Location (Link to Google Maps)"
            :rules="[validURLRule]"
          />

          <v-text-field
            outlined
            v-model="payload.email"
            label="Email Address"
            :rules="[validEmailRule]"
          />

          <v-text-field outlined label="Phone Number" />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="error" rounded text @click="cancel">
            Cancel
          </v-btn>
          <v-btn class="success" rounded text @click="save" :disabled="!valid">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import { defineComponent, ref, reactive } from '@vue/composition-api';
import { validEmailRule, validURLRule } from '@/utils/validation';

export default defineComponent({
  setup() {
    const dialog = ref(false); // Dialog is closed by default

    const configuration = reactive({
      valid: true,
    });

    const cancel = () => {
      dialog.value = false; // Closes dialog
    };

    const save = () => {
      dialog.value = false; // Closes dialog
    };

    return {
      ...configuration,
      dialog,
      cancel,
      save,
      validEmailRule,
      validURLRule,
    };
  },
});
</script>
