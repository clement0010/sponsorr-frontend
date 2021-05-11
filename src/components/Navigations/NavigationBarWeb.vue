<template>
  <v-app-bar class="primary" flat app>
    <v-app-bar-title>
      <LogoSponsorr />
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <v-btn
      class="primary text-lowercase font-weight-regular"
      text
      to="/login"
      :ripple="false"
    >
      login
    </v-btn>
    <v-btn
      class="text-lowercase font-weight-regular"
      outlined
      to="/signup"
      :ripple="false"
    >
      sign up
    </v-btn>
  </v-app-bar>
</template>

<script>
import LogoSponsorr from '@/components/BuildingElements/LogoSponsorr.vue';

export default {
  components: {
    LogoSponsorr,
  },
};
</script>

<style scoped>
.btn {
  text-transform: none;
}
</style>
