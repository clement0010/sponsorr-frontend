<template>
  <BasePage>
    <v-card light class="pa-5">
      <v-card-title>login</v-card-title>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          placeholder="email address"
          solo
          outlined
          flat
          v-model="email"
          :rules="[rules.required, rules.email]"
          label="email address"
        >
        </v-text-field>
        <v-text-field
          placeholder="password"
          solo
          outlined
          flat
          v-model="password"
          name="password-input"
          label="password"
          :type="'password'"
          :rules="[rules.required, rules.counter]"
        >
        </v-text-field>
        <v-btn class="accent1 white--text" rounded @click="submit">
          login
        </v-btn>
        <v-card-subtitle>
          <span>don't have an account with us? </span>
          <span><router-link to="/signup">sign up</router-link></span>
        </v-card-subtitle>
      </v-form>
    </v-card>
  </BasePage>
</template>

<script lang="ts">
import BasePage from '@/layouts/BasePage.vue';

const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const email = (value: string) => pattern.test(value) || 'Invalid email';
const required = (value: unknown) => !!value || 'Required';

export default {
  components: {
    BasePage,
  },
  data() {
    return {
      rules: {
        email,
        required,
      },
    };
  },
};
</script>
