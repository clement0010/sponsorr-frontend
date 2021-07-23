<template>
  <v-container>
    <Spinner v-if="authLoading" />
    <v-row justify="center">
      <v-col cols="auto">
        <router-link to="/">
          <LogoSponsorr class="ma-10" justify="center" :width="logoWidth" />
        </router-link>
      </v-col>
    </v-row>
    <v-card class="pa-5" width="800">
      <v-card-title> login </v-card-title>
      <v-form ref="form" v-model="valid">
        <v-text-field
          v-model="user.email"
          outlined
          required
          hint="Required"
          label="email address"
          :rules="[requireInputRule, validEmailRule]"
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
          :rules="[requireInputRule]"
          @click:append="showPassword = !showPassword"
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
              Login
            </v-btn>
          </v-card-actions>
        </v-row>
      </v-form>

      <v-card-subtitle>
        <span>don't have an account with us? </span>
        <span>
          <AuthenticationButton :color="'black'" />
        </span>
      </v-card-subtitle>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import AuthenticationButton from '@/components/Authentication/AuthenticationButton.vue';
import LogoSponsorr from '@/components/BuildingElements/LogoSponsorr.vue';
import Spinner from '@/components/BuildingElements/Spinner.vue';

import useAuth from '@/composable/authComposition';
import useSnackbar from '@/composable/snackbarComposition';

import { requireInputRule, validEmailRule } from '@/common/validation';
import { authLoading } from '@/composable/store';
import { defineComponent, reactive } from '@vue/composition-api';

export default defineComponent({
  name: 'FormLogin',
  components: { LogoSponsorr, AuthenticationButton, Spinner },
  setup() {
    const logoWidth = 250;

    const configuration = reactive({
      valid: true,
      showPassword: false,
    });

    const { login, error, userInfo } = useAuth();
    const { alert, success } = useSnackbar();

    const user = reactive({
      email: '',
      password: '',
    });

    const authenticateUser = async (e: Event) => {
      e.preventDefault();
      try {
        const { email, password } = user;
        await login(email, password);

        const uid = userInfo.value?.uid;

        if (!uid) {
          console.log('Wrong credentials!');
          alert('Authentication Error: Incorrect password or email.');
          user.email = '';
          user.password = '';
          return;
        }

        success('Logged in!');
      } catch (err) {
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

      // Login
      error,
      authenticateUser,

      // Spinner
      authLoading,
    };
  },
});
</script>
