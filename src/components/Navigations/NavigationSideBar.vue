<template>
  <v-navigation-drawer permanent :mini-variant.sync="mini" app @click="mini = !mini">
    <UserStatusCard v-if="!mini" @toggleSideBar="mini = !mini" />
    <v-row v-else justify="center" class="py-2">
      <v-col cols="auto">
        <UserInitialsAvatar :disabled="true" @click.stop="mini = !mini" />
      </v-col>
    </v-row>
    <v-divider />
    <v-list v-if="id" nav>
      <v-list-item-group :value="selected" color="primary">
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

        <router-link
          v-if="role === 'Sponsor'"
          :to="{ name: 'Marketplace' }"
          data-cy="navigate-marketplace"
        >
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

        <router-link v-if="role === 'EventOrganiser'" :to="{ name: 'EventMatches' }">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account-supervisor-circle-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              Event Matches
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link
          v-if="role === 'Sponsor'"
          :to="{ name: 'Matches' }"
          data-cy="navigate-my-matches"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account-supervisor-circle-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              Matches
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
          <HelpDialog />
          <v-list-item data-cy="logout-button" @click="userSignout">
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
  </v-navigation-drawer>
</template>

<script lang="ts">
import HelpDialog from '@/components/UserAssistance/HelpDialog.vue';
import UserInitialsAvatar from '@/components/BuildingElements/UserInitialsAvatar.vue';
import UserStatusCard from '@/components/BuildingElements/UserStatusCard.vue';

import useAuth from '@/composable/authComposition';
import useProfile from '@/composable/profileComposition';

import { uid } from '@/composable/store';
import { ref, defineComponent, computed } from '@vue/composition-api';

export default defineComponent({
  name: 'NavigationSideBar',
  components: {
    HelpDialog,
    UserStatusCard,
    UserInitialsAvatar,
  },
  setup(_, { root }) {
    const { signout } = useAuth();
    const { clearProfile, role } = useProfile();

    const mini = ref(true);
    const routeName = computed(() => root.$route.name);

    const selected = computed(() => {
      if (role.value === 'EventOrganiser') {
        switch (routeName.value) {
          case 'Profile':
            if (uid.value === root.$route.params.id) {
              return 0;
            }
            return undefined;
          case 'Dashboard':
            return 1;
          case 'EventMatches':
            return 2;
          case 'Analytics':
            return 3;
          default:
            return undefined;
        }
      }
      if (role.value === 'Sponsor') {
        switch (routeName.value) {
          case 'Profile':
            if (uid.value === root.$route.params.id) {
              return 0;
            }
            return undefined;
          case 'Marketplace':
            return 1;
          case 'Matches':
            return 2;
          case 'Analytics':
            return 3;
          case 'Settings':
            return 4;
          default:
            return undefined;
        }
      }
      return undefined;
    });

    const userSignout = async () => {
      await signout();
      root.$router.push({
        name: 'Home',
      });
      clearProfile();
    };

    return {
      selected,
      userSignout,
      role,
      id: uid,
      mini,
    };
  },
});
</script>
