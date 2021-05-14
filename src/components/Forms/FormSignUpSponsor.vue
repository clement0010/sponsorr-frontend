<template>
  <v-container>
    <v-card light class="pa-5">
      <v-card-title> sign up as sponsor </v-card-title>
      <v-form ref="form" v-model="valid">
        <v-text-field
          outlined
          required
          hint="Required"
          label="name of entity"
          :rules="[requireInputRule]"
        />

        <v-text-field
          v-model="signUpDetails.uen"
          outlined
          hint="Optional, for verification purposes (what is it?)"
          label="UEN"
        />

        <v-text-field
        v-model="signUpDetails.email"
          outlined
          required
          hint="Required"
          label="email address"
          :rules="[requireInputRule, validEmailRule]"
        />

        <v-text-field
          v-model="signUpDetails.phoneNumber"
          outlined
          required
          hint="required"
          label="phone number"
          type="number"
          :rules="[requireInputRule]"
        />

        <v-text-field
          v-model="signUpDetails.password"
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
          v-model="signUpDetails.confirmedPassword"
          outlined
          required
          hint="Required"
          label="re-type password"
          :type="showConfirmPassword ? 'text' : 'password'"
          :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showConfirmPassword = !showConfirmPassword"
          :rules="[requireInputRule, validatePassword]"
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
  requireInputRule, validEmailRule, passwordLengthRule,
} from '@/utils/validation';
import { defineComponent, reactive } from '@vue/composition-api';

export default defineComponent({
  setup(_, { root }) {
    const configuration = reactive({
      valid: true,
      showPassword: false,
      showConfirmPassword: false,
    });

    const signUpDetails = reactive({
      email: '',
      password: '',
      confirmedPassword: '',
      phoneNumber: '',
      uen: '',
    });
    const validatePassword = (password:string) => signUpDetails.password === password || 'Password do not match';

    const submitForm = (e: Event) => {
      e.preventDefault();

      // Login
      console.log('Signed Up!', root.$route.params);

      root.$router.push({ name: 'Profile', params: { id: '123' } });
    };

    return {
      // Validation
      ...configuration,
      requireInputRule,
      validEmailRule,
      validatePassword,
      passwordLengthRule,

      // Sign Up
      signUpDetails,
      submitForm,
    };
  },
});
</script>
