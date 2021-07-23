<template>
  <v-overlay :value="emailVerified || !deactivatedRoutes" absolute>
    <v-card class="white pa-1" max-width="500">
      <v-card-title class="black--text">
        Email Verification Needed
      </v-card-title>
      <v-card-text class="black--text">
        Welcome to Sponsorr!
        <br />
        <br />
        We noticed that you have not verified your account. To continue using the application,
        please head to the email address that you've used to register with us and click on the
        verification link.
      </v-card-text>
    </v-card>
  </v-overlay>
</template>

<script lang="ts">
import { emailVerified } from '@/composable/store';
import { computed, defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'VerificationModal',
  setup(_, { root }) {
    const deactivatedRoutes = computed(
      () =>
        root.$route.name === 'Home' ||
        root.$route.name === 'SignUp' ||
        root.$route.name === 'Login',
    );

    return {
      emailVerified,
      deactivatedRoutes,
    };
  },
});
</script>
