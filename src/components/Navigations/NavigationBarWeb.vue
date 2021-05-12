<template>
  <v-app-bar class="primary" flat app>
    <v-app-bar-title>
      <LogoSponsorr />
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <Login />
    <SignUp />
  </v-app-bar>
</template>

<script>
import LogoSponsorr from '@/components/BuildingElements/LogoSponsorr.vue';
import Login from '@/components/dialogs/RoleSelectionLogin.vue';
import SignUp from '@/components/dialogs/RoleSelectionSignUp.vue';

export default {
  components: {
    LogoSponsorr,
    Login,
    SignUp,
  },
};
</script>

<style scoped>
.btn {
  text-transform: none;
}
</style>
