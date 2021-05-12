<template>
  <v-card light class="pa-5">
    <v-card-title>sign up as sponsor</v-card-title>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        placeholder="name of entity"
        solo
        outlined
        flat
        :rules="[rules.required]"
        label="name of entity"
      >
      </v-text-field>
      <v-text-field
        placeholder="UEN"
        solo
        outlined
        flat
        label="UEN"
        hint="optional, for verification purposes (what is it?)"
      >
      </v-text-field>
      <v-text-field
        placeholder="phone number"
        solo
        outlined
        flat
        v-model="numberValue"
        type="number"
        :rules="[rules.required]"
        label="phone number"
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
        :rules="[rules.required]"
      >
      </v-text-field>
      <v-text-field
        placeholder="re-type password"
        solo
        outlined
        flat
        v-model="password"
        name="retype-password-input"
        label="retype-password"
        :type="'password'"
        :rules="[rules.required]"
      >
      </v-text-field>
      <v-btn class="accent1 white--text" rounded @click="submit">
        create account
      </v-btn>
      <v-card-subtitle>
        <span>have an account with us? </span>
        <span><router-link to="/login">login</router-link></span>
      </v-card-subtitle>
    </v-form>
  </v-card>
</template>

<script lang="ts">
const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const email = (value: string) => pattern.test(value) || 'Invalid email';
const required = (value: unknown) => !!value || 'Required';

export default {
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
