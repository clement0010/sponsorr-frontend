<template>
  <v-container>
    <Spinner v-if="loading" />
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
  </v-container>
</template>

<script lang="ts">
import LogoSponsorr from '@/components/BuildingElements/LogoSponsorr.vue';
import Spinner from '@/components/BuildingElements/Spinner.vue';

import useAuth from '@/composable/authComposition';
import useSnackBar from '@/composable/snackbarComposition';

import { requireInputRule, validEmailRule, passwordLengthRule } from '@/common/validation';
import { Sponsor } from '@/types';
import { authLoading } from '@/composable/store';
import { defineComponent, reactive } from '@vue/composition-api';

export default defineComponent({
  name: 'FormSignUpSponsor',
  components: {
    LogoSponsorr,
    Spinner,
  },
  setup(_, { root }) {
    const logoWidth = 250;

    const { signup } = useAuth();
    const { success, alert } = useSnackBar();

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
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        subscribed: false,
      };
      try {
        const uid: string = await signup(email, password, userMetadata);
        root.$router.push({
          name: 'Profile',
          params: { id: uid },
        });
        success('Signed up!');
      } catch (err) {
        console.error(err);
        alert(`Sign up error ${err}`);
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
      loading: authLoading,

      authenticateUser,
    };
  },
});
</script>
