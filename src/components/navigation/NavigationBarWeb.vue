<template>
  <v-app-bar
    class="primary"
    flat
  >
    <v-app-bar-title>
      <LogoSponsorr />
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <v-btn
      class="primary"
      text
      :ripple="false"
    >
      login
    </v-btn>
    <v-btn
      outlined
      :ripple="false"
    >
      sign up
    </v-btn>
  </v-app-bar>
</template>

<script>
import LogoSponsorr from '@/components/elements/LogoSponsorr.vue';

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
