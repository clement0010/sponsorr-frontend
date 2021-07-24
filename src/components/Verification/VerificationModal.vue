<template>
  <v-overlay>
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
        <br />
        <br />

        <v-btn class="accent1" @click="userSignout">Sign Out</v-btn>
      </v-card-text>
    </v-card>
  </v-overlay>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import useAuth from '@/composable/authComposition';
import useProfile from '@/composable/profileComposition';

export default defineComponent({
  name: 'VerificationModal',

  setup(_, { root }) {
    const { signout } = useAuth();
    const { clearProfile } = useProfile();

    const userSignout = async () => {
      await signout();
      root.$router.push({
        name: 'Home',
      });
      clearProfile();
    };

    return {
      userSignout,
    };
  },
});
</script>
