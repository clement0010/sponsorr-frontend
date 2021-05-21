<template>
  <v-container>
    <v-card light class="pa-5">
      <v-card-title>
        login
      </v-card-title>
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
          @click:append="showPassword = !showPassword"
          :rules="[requireInputRule]"
        />

        <v-btn
          class="accent1 white--text"
          rounded
          type="submit"
          @click="authenticateUser"
          text
          :disabled="!valid"
        >
          Login
        </v-btn>
      </v-form>

      <v-card-subtitle>
        <span>
          <router-link to="/recoverAccount">
            forgot password
          </router-link>
        </span>
        <span>| don't have an account with us? </span>
        <span>
          <router-link to="signup">
            sign up
          </router-link>
        </span>
      </v-card-subtitle>
    </v-card>

    <div class="text-center" v-if="loading">
      <v-overlay>
        <v-progress-circular indeterminate size="64" />
      </v-overlay>
    </div>
  </v-container>
</template>

<script lang="ts">
import { requireInputRule, validEmailRule } from '@/utils/validation';
import { defineComponent, reactive } from '@vue/composition-api';

import useAuth from '@/composable/authComposition';

export default defineComponent({
  setup(_, { root }) {
    const { loading, login } = useAuth();

    const configuration = reactive({
      valid: true,
      showPassword: false,
    });

    const user = reactive({
      email: '',
      password: '',
    });

    const authenticateUser = (e: Event) => {
      e.preventDefault();
      const { email, password } = user;
      console.log(email, password);
      login(email, password);
      root.$router.push({ name: 'Profile', params: { id: '123' } });
    };

    return {
      // Validation
      ...configuration,
      requireInputRule,
      validEmailRule,

      // Login
      user,
      authenticateUser,

      // Spinner
      loading,
    };
  },
});
</script>
