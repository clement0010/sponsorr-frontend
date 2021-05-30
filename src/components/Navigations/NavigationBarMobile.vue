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
              <LogoSponsorr :width="175" />
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
                        <LogoSponsorr :width="175" />
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
              <v-list v-if="!authenticated">
                <v-list-item class="justify-center">
                  <router-link
                    :to="{name:'Login'}"
                  >
                    <v-btn
                      class="text-lowercase font-weight-regular"
                      rounded
                      text
                    >
                      Login
                    </v-btn>
                  </router-link>
                </v-list-item>
                <v-list-item class="justify-center">
                  <AuthenticationButton :action="'SignUp'" />
                </v-list-item>
              </v-list>
              <v-list v-else>
                <v-list-item class="justify-center">
                  <router-link :to="{name:'Profile', params:{ id }}">
                    <v-btn
                      class="font-weight-regular"
                      rounded
                      text
                    >
                      Profile
                    </v-btn>
                  </router-link>
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
      dialog,
      logoWidth,
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
