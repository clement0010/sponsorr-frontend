<template>
  <v-container fluid class="pa-0">
    <v-app-bar class="primary" flat app hide-on-scroll>
      <v-container fill-height class="py-0">
        <v-row align="center" justify="center" class="py-0">
          <v-col class="py-0" cols="auto">
            <v-app-bar-nav-icon
              v-if="authenticated"
              class="white--text"
              @click.stop="toggleSideBar"
            />
          </v-col>
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
    <NavigationSideBar v-if="!loading && authenticated" :drawer="drawer" />
  </v-container>
</template>

<script lang="ts">
import AuthenticationButton from '@/components/Authentication/AuthenticationButton.vue';
import LogoSponsorr from '@/components/BuildingElements/LogoSponsorr.vue';
import NavigationSideBar from '@/components/Navigations/NavigationSideBar.vue';
import { authenticated, authLoading } from '@/composable/store';

import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'NavigationBarWeb',
  components: {
    AuthenticationButton,
    LogoSponsorr,
    NavigationSideBar,
  },
  setup() {
    const drawer = ref(false);

    const toggleSideBar = () => {
      drawer.value = !drawer.value;
    };

    return {
      authenticated,
      drawer,
      loading: authLoading,
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
