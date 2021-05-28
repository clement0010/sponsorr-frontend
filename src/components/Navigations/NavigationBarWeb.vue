<template>
  <v-app-bar class="primary" flat app hide-on-scroll>
    <v-container fill-height class="py-0">
      <v-row align="center" justify="center" class="py-0" v-if="isHome()">
        <v-col cols="auto" class="py-0">
          <v-app-bar-title>
            <router-link to="/">
              <LogoSponsorr :width="logoWidth"/>
            </router-link>
          </v-app-bar-title>
        </v-col>

        <v-spacer></v-spacer>

        <v-col cols="auto">
          <AuthenticationButton :action="'Login'" />
          <AuthenticationButton :action="'SignUp'" />
        </v-col>
      </v-row>
      <v-btn v-else light @click="userSignout">
        Sign Out
      </v-btn>
    </v-container>
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
    const logoWidth = 175;
    const { signout } = useAuth();

    const userSignout = () => {
      signout();
      root.$router.push({
        name: 'Home',
      });
    };

    const isHome = () => root.$route.name === 'Home' || root.$route.name === 'Playground';

    return { userSignout, isHome, logoWidth };
  },
});
</script>

<style scoped>
.btn {
  text-transform: none;
}

.container {
  max-width: 1320px;
}
</style>
