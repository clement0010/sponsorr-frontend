<template>
  <!-- https://vuetifyjs.com/en/components/app-bars/#fade-image-on-scroll -->
  <v-app-bar
    class="primary px-10"
    flat
    app
  >
    <v-app-bar-title>
      <router-link to="/">
        <LogoSponsorr v-if="$route.name === 'Home'" />
      </router-link>
    </v-app-bar-title>

    <v-spacer />

    <AuthenticationButton
      v-if="$route.name === 'Home'"
      :action="'Login'"
    />
    <AuthenticationButton
      v-if="$route.name === 'Home'"
      :action="'SignUp'"
    />
  </v-app-bar>
</template>

<script lang="ts">
import AuthenticationButton from '@/components/Authentication/AuthenticationButton.vue';
import LogoSponsorr from '@/components/BuildingElements/LogoSponsorr.vue';

export default {
  components: {
    AuthenticationButton,
    LogoSponsorr,
  },
};
</script>

<style scoped>
.btn {
  text-transform: none;
}
</style>
