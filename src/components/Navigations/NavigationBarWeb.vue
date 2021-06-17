<template>
  <v-container fluid class="pa-0">
    <v-app-bar class="primary" flat app hide-on-scroll>
      <v-app-bar-nav-icon v-if="authenticated" class="white--text" @click.stop="toggleSideBar" />
      <v-container fill-height class="py-0">
        <v-row align="center" justify="center" class="py-0">
          <v-col cols="auto" class="py-0">
            <v-app-bar-title>
              <router-link to="/">
                <LogoSponsorr :width="175" />
              </router-link>
            </v-app-bar-title>
          </v-col>

          <v-spacer />

          <v-col v-if="!authenticated" cols="auto">
            <router-link :to="{ name: 'Login' }">
              <v-btn class="text-lowercase font-weight-regular white--text" rounded text>
                Login
              </v-btn>
            </router-link>
            <AuthenticationButton />
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <NavigationSideBar :id="id" :drawer="drawer" />
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import useAuth from '@/composable/authComposition';

import AuthenticationButton from '@/components/Authentication/AuthenticationButton.vue';
import LogoSponsorr from '@/components/BuildingElements/LogoSponsorr.vue';
import NavigationSideBar from './NavigationSideBar.vue';

export default defineComponent({
  name: 'NavigationBarWeb',
  components: {
    AuthenticationButton,
    LogoSponsorr,
    NavigationSideBar,
  },
  setup(_, { root }) {
    const isHome = () => root.$route.name === 'Home' || root.$route.name === 'Playground';
    const drawer = ref(false);
    const { signout, authenticated, uid } = useAuth();

    const userSignout = () => {
      signout();
      root.$router.push({
        name: 'Home',
      });
    };

    const toggleSideBar = () => {
      drawer.value = !drawer.value;
    };

    return {
      userSignout,
      isHome,
      authenticated,
      id: uid,
      drawer,
      toggleSideBar,
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
