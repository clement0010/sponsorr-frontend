<template>
  <v-navigation-drawer :value="drawer" temporary absolute>
    <p v-if="!profile"></p>
    <UserStatusCard v-else :role="profile.role" :username="profile.name" />
    <v-divider />
    <v-list v-if="profile" nav>
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
  </v-navigation-drawer>
</template>

<script lang="ts">
import useAuth from '@/composable/authComposition';
import { ref, defineComponent, watch } from '@vue/composition-api';
import UserStatusCard from '@/components/BuildingElements/UserStatusCard.vue';
import useProfile from '@/composable/profileComposition';

export default defineComponent({
  name: 'NavigationSideBar',
  components: {
    UserStatusCard,
  },
  props: {
    drawer: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      required: true,
    },
  },
  setup(_, { root }) {
    const { signout, uid, authenticated, loading } = useAuth();
    const { profile, fetchUserProfile } = useProfile();
    const selected = ref(0);

    watch(authenticated, async () => {
      if (authenticated) {
        await fetchUserProfile(uid.value);
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
          case 'Settings':
            selected.value = 3;
            break;
          default:
            selected.value = -1;
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
          case 'Settings':
            selected.value = 3;
            break;
          default:
            selected.value = -1;
            break;
        }
      }
    });

    const userSignout = () => {
      signout();
      root.$router.push({
        name: 'Home',
      });
    };

    return {
      selected,
      userSignout,
      authenticated,
      loading,
      profile,
    };
  },
});
</script>
