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

    <v-form
      ref="form"
      v-model="valid"
    >
      <v-card light>
        <v-card-title>
          <span class="headline">
            Edit Contact Details
          </span>
        </v-card-title>

        <v-card-text>
          <v-text-field
            v-model="payload.link"
            outlined
            label="Link to Website"
            :rules="[validURLRule]"
          />

          <v-text-field
            v-model="payload.location"
            outlined
            label="Location (Link to Google Maps)"
            :rules="[validURLRule]"
          />

          <v-text-field
            v-model="payload.email"
            outlined
            label="Email Address"
            :rules="[validEmailRule]"
          />

          <v-text-field
            v-model="payload.phone"
            outlined
            label="Phone Number"
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
            :disabled="!valid"
            @click="save"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import { defineComponent, ref, reactive } from '@vue/composition-api';
import { abort, payload, send } from '@/utils/profile';
import { validEmailRule, validURLRule } from '@/utils/validation';

export default defineComponent({
  setup() {
    const dialog = ref(false); // Dialog is closed by default

    const configuration = reactive({
      valid: true,
    });

    const cancel = () => {
      dialog.value = false; // Closes dialog
      abort();
    };

    const save = (e) => {
      e.preventDefault();
      dialog.value = false; // Closes dialog
      send();
    };

    return {
      ...configuration,
      dialog,
      cancel,
      save,
      payload,
      send,
      validEmailRule,
      validURLRule,
    };
  },
});
</script>
