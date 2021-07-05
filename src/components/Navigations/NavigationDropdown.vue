<template>
  <v-col cols="auto">
    <v-dialog v-model="dialog" fullscreen transition="slide-x-reverse-transition">
      <template #activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-app-bar-nav-icon class="white--text" />
        </v-btn>
      </template>

      <v-card class="rounded-0">
        <v-app-bar class="primary" flat>
          <v-container fill-height class="py-0">
            <v-row align="center" justify="center" class="py-0">
              <v-col cols="auto" class="py-0">
                <v-app-bar-title>
                  <LogoSponsorr :width="175" />
                </v-app-bar-title>
              </v-col>

              <v-spacer />

              <v-col cols="auto">
                <v-btn icon color="white" @click="toggleDialog">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-app-bar>
        <v-list v-if="!authenticated" nav>
          <v-list-item class="justify-center">
            <router-link :to="{ name: 'Login' }">
              <v-btn class="text-lowercase font-weight-regular" rounded text> Login </v-btn>
            </router-link>
          </v-list-item>
          <v-list-item class="justify-center">
            <AuthenticationButton :color="'black'" />
          </v-list-item>
        </v-list>

        <div v-else>
          <p v-if="!profile"></p>

          <UserStatusCard v-else :role="profile.role" :username="profile.name" />
          <v-divider />
          <v-list nav>
            <v-list-item-group v-model="selected" color="primary" mandatory>
              <router-link :to="{ name: 'Profile', params: { id } }">
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-account</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    Profile
                  </v-list-item-content>
                </v-list-item>
              </router-link>

              <router-link v-if="profile.role === 'EventOrganiser'" :to="{ name: 'Dashboard' }">
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-view-dashboard</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    Dashboard
                  </v-list-item-content>
                </v-list-item>
              </router-link>

              <router-link v-if="profile.role === 'Sponsor'" :to="{ name: 'Matches' }">
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-account-supervisor-circle-outline</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    Matches
                  </v-list-item-content>
                </v-list-item>
              </router-link>

              <router-link :to="{ name: 'Marketplace' }">
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-shopping</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    Marketplace
                  </v-list-item-content>
                </v-list-item>
              </router-link>

              <v-divider />

              <v-list>
                <router-link :to="{ name: 'Settings' }">
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon>mdi-cog</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      Settings
                    </v-list-item-content>
                  </v-list-item>
                </router-link>

                <v-list-item @click="userSignout">
                  <v-list-item-icon>
                    <v-icon>mdi-exit-to-app</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    Sign Out
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-list-item-group>
          </v-list>
        </div>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script lang="ts">
import useAuth from '@/composable/authComposition';
import useProfile from '@/composable/profileComposition';
import { defineComponent, onMounted, ref } from '@vue/composition-api';
import AuthenticationButton from '@/components/Authentication/AuthenticationButton.vue';
import LogoSponsorr from '@/components/BuildingElements/LogoSponsorr.vue';
import UserStatusCard from '@/components/BuildingElements/UserStatusCard.vue';
import { authenticated, uid } from '@/composable/store';

export default defineComponent({
  name: 'NavigationDropdown',
  components: {
    AuthenticationButton,
    LogoSponsorr,
    UserStatusCard,
  },
  setup(_, { root, emit }) {
    const dialog = ref(false);
    const selected = ref(0);
    const { signout } = useAuth();
    const { profile } = useProfile();

    onMounted(() => {
      if (!authenticated.value) {
        return;
      }

      if (profile.value?.role === 'EventOrganiser') {
        switch (root.$route.name) {
          case 'Profile':
            selected.value = 0;
            break;
          case 'Dashboard':
            selected.value = 1;
            break;
          case 'Marketplace':
            selected.value = 2;
            break;
          default:
            selected.value = 3;
            break;
        }
      }
      if (profile.value?.role === 'Sponsor') {
        switch (root.$route.name) {
          case 'Profile':
            selected.value = 0;
            break;
          case 'Matches':
            selected.value = 1;
            break;
          case 'Marketplace':
            selected.value = 2;
            break;
          default:
            selected.value = 3;
            break;
        }
      }
    });

    const toggleDialog = () => {
      dialog.value = !dialog.value;
    };

    const userSignout = async () => {
      await signout();

      emit('success', 'Signed out!');

      root.$router.push({
        name: 'Home',
      });
    };

    return {
      dialog,
      authenticated,
      id: uid,
      userSignout,
      toggleDialog,
      selected,
      profile,
    };
  },
});
</script>
