<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="auto">
        <router-link to="/">
          <LogoSponsorr class="ma-10" justify="center" :width="logoWidth" />
        </router-link>
      </v-col>
    </v-row>
    <v-card class="pa-5">
      <v-card-title> sign up as sponsor </v-card-title>
      <v-form ref="form" v-model="valid">
        <v-text-field
          v-model="user.name"
          outlined
          required
          hint="Required"
          label="name of organisation"
          :rules="[requireInputRule]"
        />

        <v-text-field
          v-model="user.uen"
          outlined
          hint="Optional, for verification purposes (what is it?)"
          label="UEN"
        />

        <v-text-field
          v-model="user.email"
          outlined
          required
          hint="Required"
          label="email address"
          :rules="[requireInputRule, validEmailRule]"
        />

        <vue-tel-input-vuetify
          v-model="user.phoneNumber"
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

        <v-text-field
          v-model="user.password"
          outlined
          flat
          required
          hint="Required"
          label="password"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[requireInputRule, passwordLengthRule]"
          @click:append="showPassword = !showPassword"
        />

        <v-text-field
          v-model="user.confirmedPassword"
          outlined
          required
          hint="Required"
          label="re-type password"
          :type="showConfirmPassword ? 'text' : 'password'"
          :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[requireInputRule, validatePassword]"
          @click:append="showConfirmPassword = !showConfirmPassword"
        />

        <v-card-text v-if="error"> There's an issue signing up. </v-card-text>
        <v-row justify="center">
          <v-card-actions>
            <v-btn
              class="accent1 white--text"
              rounded
              type="submit"
              text
              :disabled="!valid"
              @click="authenticateUser"
            >
              Create Account
            </v-btn>
          </v-card-actions>
        </v-row>
      </v-form>
      <v-row justify="center">
        <v-card-subtitle>
          <span>have an account with us? </span>
          <span><router-link to="/login">login</router-link></span>
        </v-card-subtitle>
      </v-row>
    </v-card>

    <Spinner :loading="loading" />
  </v-container>
</template>

<script lang="ts">
import { requireInputRule, validEmailRule, passwordLengthRule } from '@/common/validation';
import { defineComponent, reactive } from '@vue/composition-api';
import useAuth from '@/composable/authComposition';
import { Sponsor } from '@/types';
import Spinner from '@/components/BuildingElements/Spinner.vue';
import LogoSponsorr from '../../BuildingElements/LogoSponsorr.vue';

export default defineComponent({
  name: 'FormSignUpSponsor',
  components: { LogoSponsorr, Spinner },
  setup(_, { root, emit }) {
    const logoWidth = 250;

    const { error, signup, loading } = useAuth();

    const configuration = reactive({
      valid: true,
      showPassword: false,
      showConfirmPassword: false,
    });

    const user = reactive({
      name: '',
      email: '',
      password: '',
      confirmedPassword: '',
      phoneNumber: '',
      uen: '',
    });

    const validatePassword = (password: string) =>
      user.password === password || 'Password do not match';

    const authenticateUser = async (e: Event): Promise<void> => {
      e.preventDefault();

      const { email, password } = user;
      const userMetadata: Sponsor = {
        about: 'Fill in your bio',
        keywords: [],
        displayPicture: '',
        role: 'Sponsor',
        contact: {
          location: 'Insert your location here',
          websiteUrl: 'Insert your website url here',
        },
        ...user,
      };
      try {
        const uid: string = await signup(email, password, userMetadata);

        emit('success', 'Signed up successfully!');

        root.$router.push({
          name: 'Profile',
          params: { id: uid },
        });
      } catch (err) {
        emit('alert', 'Signed up failed!');

        console.error(err);
      }
    };

    return {
      logoWidth,
      // Input
      user,

      // Input validation
      ...configuration,
      requireInputRule,
      validEmailRule,
      validatePassword,
      passwordLengthRule,

      // Sign up
      error,
      loading,

      authenticateUser,
    };
  },
});
</script>
