<template>
  <v-card light class="pa-5">
    <v-card-title>
      login
    </v-card-title>
    <v-form ref="form" v-model="valid">
      <v-text-field
        outlined
        required
        hint="Required"
        label="email address"
        :rules="[requireInputRule, validEmailRule]"
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

      <v-btn
        class="accent1 white--text"
        rounded
        type="submit"
        @click="submitForm"
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
        <router-link to="/signup">
          sign up
        </router-link>
      </span>
    </v-card-subtitle>
  </v-card>
</template>

<script lang="ts">
const requireInputRule = (value: string) => !!value || 'Required';

export default {
  data: () => ({
    valid: true,
    showPassword: false,
    requireInputRule,
  }),
};
</script>
