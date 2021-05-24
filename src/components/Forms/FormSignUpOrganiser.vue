<template>
  <v-container>
    <v-card light class="pa-5">
      <v-card-title> sign up as event organiser </v-card-title>
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

        <v-text-field
          v-model="user.phoneNumber"
          outlined
          required
          hint="required"
          label="phone number"
          type="number"
          :rules="[requireInputRule]"
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
          :rules="[requireInputRule, passwordLengthRule]"
        />

        <v-text-field
          v-model="user.confirmedPassword"
          outlined
          required
          hint="Required"
          label="re-type password"
          :type="showConfirmPassword ? 'text' : 'password'"
          :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showConfirmPassword = !showConfirmPassword"
          :rules="[requireInputRule, validatePassword]"
        />

        <v-card-text v-if="error"> There's an issue signing up. </v-card-text>

        <v-btn
          class="accent1 white--text"
          rounded
          type="submit"
          @click="routeUser"
          text
          :disabled="!valid"
        >
          Create Account
        </v-btn>
      </v-form>

      <v-card-subtitle>
        <span>have an account with us? </span>
        <span><router-link to="login">login</router-link></span>
      </v-card-subtitle>
    </v-card>

    <!-- Spinner -->
    <div class="text-center" v-if="loading">
      <v-overlay>
        <v-progress-circular indeterminate size="64" />
      </v-overlay>
    </div>
  </v-container>
</template>

<script lang="ts">
import { requireInputRule, validEmailRule, passwordLengthRule } from '@/utils/validation';
import { defineComponent, reactive } from '@vue/composition-api';
import useAuth from '@/composable/authComposition';

export default defineComponent({
  setup(_, { root }) {
    const { error, signup } = useAuth();

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

    const validatePassword = (password: string) => user.password === password || 'Password do not match';

    const authenticateUser = async () => {
      const { email, password, name } = user;
      await signup(email, password, name);
    };

    const routeUser = (e: Event) => {
      e.preventDefault();
      authenticateUser()
        .then((_value) => {
          root.$router.push({
            name: 'Profile',
            params: { id: '123' },
          });
        })
        .catch((err) => console.log(err));
    };

    return {
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

      // Routing
      routeUser,
    };
  },
});
</script>
