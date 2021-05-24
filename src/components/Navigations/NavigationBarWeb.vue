<template>
  <!-- https://vuetifyjs.com/en/components/app-bars/#fade-image-on-scroll -->
  <v-app-bar class="primary px-10" flat app>
    <v-app-bar-title>
      <router-link to="/">
        <LogoSponsorr v-if="$route.name === 'Home'" />
      </router-link>
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <AuthenticationButton :action="'Login'" v-if="$route.name === 'Home'" />
    <AuthenticationButton :action="'SignUp'" v-if="$route.name === 'Home'" />
    <v-btn v-else light @click="userSignout">
      Sign Out
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import AuthenticationButton from '@/components/Authentication/AuthenticationButton.vue';
import LogoSponsorr from '@/components/BuildingElements/LogoSponsorr.vue';
import useAuth from '@/composable/authComposition';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'NavigationBarWeb',
  components: {
    AuthenticationButton,
    LogoSponsorr,
  },
  setup(_, { root }) {
    const { signout } = useAuth();

    const userSignout = () => {
      signout();
      root.$router.push({
        name: 'Home',
      });
    };

    return { userSignout };
  },
});
</script>

<style scoped>
.btn {
  text-transform: none;
}
</style>
