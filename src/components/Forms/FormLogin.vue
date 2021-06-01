<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="auto">
        <router-link to="/">
          <LogoSponsorr class="ma-10" justify="center" :width="logoWidth" />
        </router-link>
      </v-col>
    </v-row>
    <v-card light class="pa-5">
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
        <span>
          <router-link to="/recoverAccount"> forgot password </router-link>
        </span>
        <span>| don't have an account with us? </span>
        <span>
          <AuthenticationButton :action="'SignUp'" />
        </span>
      </v-card-subtitle>
    </v-card>

    <div v-if="loading" class="text-center">
      <v-overlay>
        <v-progress-circular indeterminate size="64" />
      </v-overlay>
    </div>
  </v-container>
</template>

<script lang="ts">
import { requireInputRule, validEmailRule } from '@/common/validation';
import { defineComponent, reactive } from '@vue/composition-api';

import useAuth from '@/composable/authComposition';

import AuthenticationButton from '@/components/Authentication/AuthenticationButton.vue';
import LogoSponsorr from '../BuildingElements/LogoSponsorr.vue';

export default defineComponent({
  name: 'FormLogin',
  components: { LogoSponsorr, AuthenticationButton },
  setup(_, { root, emit }) {
    const logoWidth = 250;

    const configuration = reactive({
      valid: true,
      showPassword: false,
    });

    const { loading, login, error, userInfo } = useAuth();

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
          emit('alert', 'Authentication Error: Incorrect password or email.');
          user.email = '';
          user.password = '';
          return;
        }

        emit('success', 'Logged in!');

        root.$router.push({
          name: 'Profile',
          params: { id: uid },
        });
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
      loading,
    };
  },
});
</script>
