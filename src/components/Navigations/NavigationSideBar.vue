<template>
  <v-navigation-drawer permanent absolute :mini-variant.sync="mini">
    <UserStatusCard @toggleSideBar="toggleSideBar" />
    <v-divider />
    <v-list v-if="id" nav>
      <v-list-item-group v-model="selected" color="primary">
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
  </v-navigation-drawer>
</template>

<script lang="ts">
import useAuth from '@/composable/authComposition';
import { ref, defineComponent, onMounted } from '@vue/composition-api';
import UserStatusCard from '@/components/BuildingElements/UserStatusCard.vue';
import useProfile from '@/composable/profileComposition';
import { authenticated, uid } from '@/composable/store';

export default defineComponent({
  name: 'NavigationSideBar',
  components: {
    UserStatusCard,
  },
  setup(_, { root }) {
    const { signout } = useAuth();
    const { clearProfile, role } = useProfile();

    const selected = ref(0);
    const mini = ref(true);

    onMounted(() => {
      if (!authenticated.value) {
        return;
      }

      if (role.value === 'EventOrganiser') {
        switch (root.$route.name) {
          case 'Profile':
            selected.value = 0;
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
            selected.value = 0;
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

    const toggleSideBar = () => {
      mini.value = !mini.value;
    };

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
      toggleSideBar,
      mini,
    };
  },
});
</script>
