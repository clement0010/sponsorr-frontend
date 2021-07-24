<template>
  <v-app-bar class="primary" flat app absolute>
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
        <transition name="fade">
          <v-col v-if="!authenticated" cols="auto">
            <router-link :to="{ name: 'Login' }">
              <v-btn class="text-lowercase font-weight-regular white--text" rounded text>
                Login
              </v-btn>
            </router-link>
            <AuthenticationButton />
          </v-col>
        </transition>
        <v-col v-if="authenticated" cols="auto">
          <UserInitialsAvatar />
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script lang="ts">
import AuthenticationButton from '@/components/Authentication/AuthenticationButton.vue';
import LogoSponsorr from '@/components/BuildingElements/LogoSponsorr.vue';
import UserInitialsAvatar from '@/components/BuildingElements/UserInitialsAvatar.vue';

import { authenticated, authLoading } from '@/composable/store';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'NavigationBarWeb',
  components: {
    AuthenticationButton,
    LogoSponsorr,
    UserInitialsAvatar,
  },
  setup() {
    return {
      authenticated,
      loading: authLoading,
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
