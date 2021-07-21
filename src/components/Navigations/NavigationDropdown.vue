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
          <UserStatusCard />
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

              <router-link v-if="role === 'Sponsor'" :to="{ name: 'Marketplace' }">
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-shopping</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    Marketplace
                  </v-list-item-content>
                </v-list-item>
              </router-link>

              <router-link v-if="role === 'EventOrganiser'" :to="{ name: 'Dashboard' }">
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-view-dashboard</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    Dashboard
                  </v-list-item-content>
                </v-list-item>
              </router-link>

              <router-link :to="{ name: 'Analytics' }">
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-chart-line-variant</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    Analytics
                  </v-list-item-content>
                </v-list-item>
              </router-link>

              <router-link v-if="role === 'Sponsor'" :to="{ name: 'Matches' }">
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-account-supervisor-circle-outline</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    Matches
                  </v-list-item-content>
                </v-list-item>
              </router-link>

              <v-divider />

              <v-list>
                <router-link v-if="role === 'Sponsor'" :to="{ name: 'Settings' }">
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
                <HelpDialog :color="'black'" />
              </v-list>
            </v-list-item-group>
          </v-list>
        </div>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script lang="ts">
import AuthenticationButton from '@/components/Authentication/AuthenticationButton.vue';
import HelpDialog from '@/components/UserAssistance/HelpDialog.vue';
import LogoSponsorr from '@/components/BuildingElements/LogoSponsorr.vue';
import UserStatusCard from '@/components/BuildingElements/UserStatusCard.vue';

import useAuth from '@/composable/authComposition';
import useProfile from '@/composable/profileComposition';

import { authenticated, uid } from '@/composable/store';
import { defineComponent, onMounted, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'NavigationDropdown',
  components: {
    AuthenticationButton,
    HelpDialog,
    LogoSponsorr,
    UserStatusCard,
  },
  setup(_, { root }) {
    const { signout } = useAuth();
    const { clearProfile, role } = useProfile();
    const dialog = ref(false);
    const selected = ref();

    onMounted(() => {
      if (!authenticated.value) {
        return;
      }

      if (role.value === 'EventOrganiser') {
        switch (root.$route.name) {
          case 'Profile':
            if (uid.value === root.$route.params.id) {
              selected.value = 0;
              break;
            }
            selected.value = undefined;
            break;
          case 'Dashboard':
            selected.value = 1;
            break;
          case 'Analytics':
            selected.value = 2;
            break;
          default:
            selected.value = -1;
            break;
        }
      }
      if (role.value === 'Sponsor') {
        switch (root.$route.name) {
          case 'Profile':
            if (uid.value === root.$route.params.id) {
              selected.value = 0;
              break;
            }
            selected.value = undefined;
            break;
          case 'Marketplace':
            selected.value = 1;
            break;
          case 'Matches':
            selected.value = 2;
            break;
          case 'Analytics':
            selected.value = 3;
            break;
          case 'Settings':
            selected.value = 4;
            break;
          default:
            selected.value = -1;
            break;
        }
      }
    });

    const toggleDialog = () => {
      dialog.value = !dialog.value;
    };

    const userSignout = async () => {
      await signout();
      root.$router.push({
        name: 'Home',
      });
      clearProfile();
    };

    return {
      dialog,
      authenticated,
      id: uid,
      userSignout,
      toggleDialog,
      selected,
      role,
    };
  },
});
</script>
