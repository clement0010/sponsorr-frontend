<template>
  <v-overlay :value="displayCondition">
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
import { computed, defineComponent } from '@vue/composition-api';
import useAuth from '@/composable/authComposition';
import useProfile from '@/composable/profileComposition';
import { emailVerified } from '@/composable/store';

export default defineComponent({
  name: 'VerificationModal',
  setup(_, { root }) {
    const { signout } = useAuth();
    const { clearProfile } = useProfile();

    const deactivatedRoutes = computed(
      () => root.$route.name === 'SignUp' || root.$route.name === 'Login',
    );
    const displayCondition = computed(() => {
      if (deactivatedRoutes.value) return false;

      return !emailVerified.value;
    });

    const userSignout = async () => {
      await signout();
      root.$router.push({
        name: 'Home',
      });
      clearProfile();
    };

    return {
      displayCondition,
      userSignout,
    };
  },
});
</script>
