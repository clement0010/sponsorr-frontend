<template>
  <v-container fluid>
    <v-form>
      <v-text-field label="Email" v-model="user.email"> </v-text-field>
      <v-text-field label="Password" v-model="user.password"> </v-text-field>
    </v-form>

    <v-row justify="center" align="center">
      <v-col align="center" v-if="!authenticated">
        <v-btn @click="authenticateUser('Login')">Login</v-btn>
      </v-col>
      <v-col align="center" v-else>
        <v-btn @click="signout">Sign Out</v-btn>
        <p>{{ profileData }}</p>
      </v-col>
      <v-col align="center" v-if="!authenticated">
        <v-btn @click="authenticateUser('SignUp')">Sign up</v-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
      <h1>Loading: {{ loading }} Auth: {{ authenticated }}</h1>
      <h1>{{ user.email }}</h1>
    </v-row>

    <!-- Error -->
    <v-btn v-if="error" class="error" @click="error = !error"> Error! </v-btn>

    <!-- Spinner -->
    <div class="text-center" v-if="loading">
      <v-overlay>
        <v-progress-circular indeterminate size="64" />
      </v-overlay>
    </div>
  </v-container>
</template>

<script lang="ts">
import useAuth from '@/composable/authComposition';
import useProfile from '@/composable/profileComposition';

import { defineComponent, reactive } from '@vue/composition-api';

export default defineComponent({
  name: 'Home',

  setup() {
    const {
      loading,
      authenticated,
      signout,
      login,
      signup,
      error,
      userInfo,
    } = useAuth();

    const user = reactive({
      email: '',
      password: '',
    });

    const authenticateUser = (state: 'Login' | 'SignUp') => {
      const { email, password } = user;
      console.log(email, password);

      if (state === 'Login') login(email, password);

      if (state === 'SignUp') signup(email, password, email);
    };

    const { profileData } = useProfile(userInfo);

    return {
      // Use authentication
      loading,
      authenticated,
      error,
      signout,
      login,
      signup,

      // User details
      user,
      authenticateUser,

      // Profile
      profileData,
    };
  },
});
</script>
