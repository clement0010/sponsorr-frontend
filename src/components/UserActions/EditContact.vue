<template>
  <v-dialog v-model="dialog" max-width="600px" persistent>
    <template #activator="{ on, attrs }">
      <v-btn icon class="mx-5" v-bind="attrs" v-on="on">
        <v-icon color="black"> mdi-pencil </v-icon>
      </v-btn>
    </template>

    <v-form ref="form" v-model="valid">
      <v-card>
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

          <vue-tel-input-vuetify
            v-model="input.phoneNumber"
            outlined
            required
            hint="Required"
            label="phone number"
            placeholder=""
            autocomplete
            :only-countries="['SG']"
            :mode="'international'"
            :valid-characters-only="true"
            :rules="[requireInputRule, numericsOnlyRule]"
          />
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
import useAuth from '@/composable/authComposition';
import useProfile from '@/composable/profileComposition';

import {
  validEmailRule,
  validURLRule,
  numericsOnlyRule,
  requireInputRule,
} from '@/common/validation';
import { defineComponent, reactive, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'EditContact',
  props: {
    phoneNumber: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    websiteUrl: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { uid } = useAuth();
    const { editUserProfile } = useProfile();
    const { phoneNumber, location, websiteUrl } = props;

    const dialog = ref(false);
    const valid = ref(true);

    const input = reactive({
      phoneNumber,
      location,
      websiteUrl,
    });

    const cancel = () => {
      dialog.value = false;
      input.phoneNumber = phoneNumber;
      input.location = location;
      input.websiteUrl = websiteUrl;
    };

    const edit = async () => {
      dialog.value = false;
      const locationNoProtocol = input.location.replace(/^https?:\/\//i, '');
      const urlNoProtocol = input.websiteUrl.replace(/^https?:\/\//i, '');
      await editUserProfile(uid.value, {
        contact: {
          location: locationNoProtocol,
          websiteUrl: urlNoProtocol,
        },
        phoneNumber: input.phoneNumber,
      });
    };

    return {
      dialog,
      cancel,
      edit,
      input,
      validEmailRule,
      validURLRule,
      numericsOnlyRule,
      requireInputRule,
      valid,
    };
  },
});
</script>
