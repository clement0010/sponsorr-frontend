<template>
  <v-navigation-drawer :value="drawer" absolute temporary height="94vh">
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

          <router-link :to="{ name: 'Home' }" @click="signout">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-exit-to-app</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                Sign Out
              </v-list-item-content>
            </v-list-item>
          </router-link>
        </v-list>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import useAuth from '@/composable/authComposition';
import { computed, defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'NavigationSideBar',
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
    const { signout } = useAuth();

    const selected = computed(() => {
      switch (root.$route.name) {
        case 'Profile':
          return 0;
        case 'Dashboard':
          return 1;
        case 'Marketplace':
          return 2;
        default:
          return 3;
      }
    });

    return {
      selected,
      signout,
    };
  },
});
</script>
