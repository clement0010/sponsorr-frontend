<template>
  <v-app-bar
    class="primary"
    flat
    app
    hide-on-scroll
  >
    <v-container
      fill-height
      class="py-0"
    >
      <v-row
        v-if="isHome()"
        align="center"
        justify="center"
        class="py-0"
      >
        <v-col
          cols="auto"
          class="py-0"
        >
          <v-app-bar-title>
            <router-link to="/">
              <LogoSponsorr :width="logoWidth" />
            </router-link>
          </v-app-bar-title>
        </v-col>

        <v-spacer />

        <v-col cols="auto">
          <v-dialog
            v-if="isHome"
            v-model="dialog"
            fullscreen
            transition="slide-x-reverse-transition"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
              >
                <v-app-bar-nav-icon />
              </v-btn>
            </template>

            <v-card
              class="rounded-0"
              light
            >
              <v-app-bar
                class="primary"
                flat
              >
                <v-container
                  fill-height
                  class="py-0"
                >
                  <v-row
                    align="center"
                    justify="center"
                    class="py-0"
                  >
                    <v-col
                      cols="auto"
                      class="py-0"
                    >
                      <v-app-bar-title>
                        <LogoSponsorr />
                      </v-app-bar-title>
                    </v-col>

                    <v-spacer />

                    <v-col cols="auto">
                      <v-btn
                        icon
                        color="white"
                        @click="dialog=false"
                      >
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-app-bar>
              <v-list>
                <v-list-item class="justify-center">
                  <AuthenticationButton :action="'Login'" />
                </v-list-item>
                <v-list-item class="justify-center">
                  <AuthenticationButton :action="'SignUp'" />
                </v-list-item>
              </v-list>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
      <v-btn
        v-else
        light
        @click="userSignout"
      >
        Sign Out
      </v-btn>
    </v-container>
  </v-app-bar>
</template>

<script lang="ts">
import AuthenticationButton from '@/components/Authentication/AuthenticationButton.vue';
import LogoSponsorr from '@/components/BuildingElements/LogoSponsorr.vue';
import useAuth from '@/composable/authComposition';
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'NavigationBarMobile',
  components: {
    AuthenticationButton,
    LogoSponsorr,
  },
  setup(_, { root }) {
    const logoWidth = 150;
    const dialog = ref(false);

    const { signout } = useAuth();

    const userSignout = () => {
      signout();
      root.$router.push({
        name: 'Home',
      });
    };

    const isHome = () => root.$route.name === 'Home' || root.$route.name === 'Playground';

    return {
      userSignout, isHome, dialog, logoWidth,
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
