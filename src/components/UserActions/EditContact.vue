<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template #activator="{ on, attrs }">
      <v-btn icon class="mx-5" v-bind="attrs" v-on="on">
        <v-icon color="black"> mdi-pencil </v-icon>
      </v-btn>
    </template>

    <v-form ref="form" v-model="valid">
      <v-card light>
        <v-card-title>
          <span class="headline"> Edit Contact Details </span>
        </v-card-title>

        <v-card-text>
          <v-text-field
            v-model="input.websiteUrl"
            outlined
            label="Link to Website"
            :rules="[validURLRule]"
          />

          <v-text-field
            v-model="input.location"
            outlined
            label="Location (Link to Google Maps)"
            :rules="[validURLRule]"
          />

          <v-text-field v-model="input.phoneNumber" outlined label="Phone Number" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn class="error" rounded text @click="cancel"> Cancel </v-btn>
          <v-btn class="success" rounded text :disabled="!valid" @click="edit"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from '@vue/composition-api';
import { validEmailRule, validURLRule } from '@/common/validation';
import { Contact } from '@/types';

export default defineComponent({
  name: 'EditContact',
  props: {
    contact: {
      type: Object as () => Contact,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
  },
  setup(props, { emit }) {
    const { phoneNumber, contact } = props;

    const input = reactive({
      ...contact,
      phoneNumber,
    });
    const dialog = ref(false); // Dialog is closed by default
    const valid = ref(true);

    const cancel = () => {
      dialog.value = false; // Closes dialog
    };

    const edit = () => {
      dialog.value = false; // Closes dialog
      // eslint-disable-next-line no-shadow
      const { location, websiteUrl, phoneNumber } = input;
      emit('edit-contact', {
        contact: {
          location,
          websiteUrl,
        },
        phoneNumber,
      });
    };

    return {
      dialog,
      cancel,
      edit,
      input,
      validEmailRule,
      validURLRule,
      valid,
    };
  },
});
</script>
