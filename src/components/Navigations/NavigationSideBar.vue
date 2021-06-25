<template>
  <v-navigation-drawer :value="drawer" temporary absolute>
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

        <router-link :to="{ name: 'Dashboard' }">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              Dashboard
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
import { ref, defineComponent, onMounted, watch } from '@vue/composition-api';
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

    watch(authenticated, async () => {
      if (authenticated) {
        console.log('fetching user');
        await fetchUserProfile(uid.value);
      }
    });

    const selected = ref(0);

    const userSignout = () => {
      signout();
      root.$router.push({
        name: 'Home',
      });
    };

    onMounted(() => {
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
    });

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
