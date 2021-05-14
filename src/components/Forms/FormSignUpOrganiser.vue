<template>
  <v-container>
    <v-card light class="pa-5">
      <v-card-title> sign up as event organiser </v-card-title>
      <v-form ref="form" v-model="valid">
        <v-text-field
          outlined
          required
          hint="Required"
          label="name of organisation"
          :rules="[requireInputRule]"
        />

        <v-text-field
          outlined
          hint="Optional, for verification purposes (what is it?)"
          label="UEN"
        />

        <v-text-field
          outlined
          required
          hint="Required"
          label="email address"
          :rules="[requireInputRule, validEmailRule]"
        />

        <v-text-field
          outlined
          required
          hint="required"
          label="phone number"
          type="number"
          :rules="[requireInputRule]"
        />

        <v-text-field
          v-bind="password"
          outlined
          flat
          required
          hint="Required"
          label="password"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          :rules="[requireInputRule, passwordLengthRule]"
        />

        <v-text-field
          v-model="confirmPassword"
          outlined
          required
          hint="Required"
          label="re-type password"
          :type="showConfirmPassword ? 'text' : 'password'"
          :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showConfirmPassword = !showConfirmPassword"
          :rules="[requireInputRule, passwordMatchRule]"
        />

        <v-btn
          class="accent1 white--text"
          rounded
          type="submit"
          @click="submitForm"
          text
          :disabled="!valid"
        >
          Create Account
        </v-btn>
      </v-form>

      <v-card-subtitle>
        <span>have an account with us? </span>
        <span><router-link to="/login">login</router-link></span>
      </v-card-subtitle>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import {
  requireInputRule,
  validEmailRule,
  passwordLengthRule,
} from '@/utils/validation';
import { defineComponent, reactive } from '@vue/composition-api';

export default defineComponent({
  setup() {
    const configuration = reactive({
      valid: true,
      showPassword: false,
      showConfirmPassword: false,
    });

    return {
      ...configuration,
      requireInputRule,
      validEmailRule,
      passwordLengthRule,
    };
  },
});
</script>
