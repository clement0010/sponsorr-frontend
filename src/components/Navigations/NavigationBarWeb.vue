<template>
  <v-app-bar class="primary" flat app hide-on-scroll>
    <v-container fill-height class="py-0">
      <v-row v-if="isHome()" align="center" justify="center" class="py-0">
        <v-col cols="auto" class="py-0">
          <v-app-bar-title>
            <router-link to="/">
              <LogoSponsorr :width="175" />
            </router-link>
          </v-app-bar-title>
        </v-col>

        <v-spacer />

        <v-col v-if="authenticated" cols="auto">
          <router-link :to="{ name: 'Profile', params: { id } }">
            <v-btn class="font-weight-regular" rounded text> Profile </v-btn>
          </router-link>
        </v-col>
        <v-col v-else cols="auto">
          <router-link :to="{ name: 'Login' }">
            <v-btn class="text-lowercase font-weight-regular" rounded text> Login </v-btn>
          </router-link>
          <AuthenticationButton :action="'SignUp'" />
        </v-col>
      </v-row>
      <v-btn v-else light @click="userSignout"> Sign Out </v-btn>
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
    const { signout, authenticated, uid } = useAuth();

    const userSignout = () => {
      signout();
      root.$router.push({
        name: 'Home',
      });
    };

    const isHome = () => root.$route.name === 'Home' || root.$route.name === 'Playground';

    return {
      userSignout,
      isHome,
      authenticated,
      id: uid,
    };
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
