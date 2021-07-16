<template>
  <v-container class="secondary" fluid>
    <v-row justify="center">
      <v-card width="1320px" color="transparent" class="my-16" flat>
        <v-row>
          <v-col cols="auto">
            <v-card-title class="text-h3 text-wrap">
              Settings
            </v-card-title>
          </v-col>
        </v-row>

        <v-card-title>
          Matching Service
        </v-card-title>
        <v-row>
          <v-col cols="auto">
            <v-card-text>
              <FormSubscribeMatching v-if="!subscribed" />
              <v-btn v-else class="error" @click="unsubscribe">
                Unsubscribe from Matching Service
              </v-btn>
            </v-card-text>
          </v-col>
        </v-row>

        <!-- <v-card-title>
          Account
        </v-card-title>
        <v-row>
          <v-col cols="auto">
            <v-list color="transparent">
              <v-list-item-group>
                <v-list-item>
                  <FormChangePassword />
                </v-list-item>

                <v-list-item @click="userSignout">
                  Sign out
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-col>
        </v-row> -->
      </v-card>
    </v-row>
  </v-container>
</template>

<script lang="ts">
// import FormChangePassword from '@/components/Forms/Authentication/FormChangePassword.vue';
import FormSubscribeMatching from '@/components/Forms/Subscription/FormSubscribeMatching.vue';

import useAuth from '@/composable/authComposition';
import useProfile from '@/composable/profileComposition';

import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'SettingsLayout',
  components: {
    // FormChangePassword,
    FormSubscribeMatching,
  },
  setup(_, { root }) {
    const { signout } = useAuth();
    const { clearProfile } = useProfile();

    // TODO: query status
    const subscribed = ref(false);

    // TODO: unsubscribe logic
    const unsubscribe = () => {
      console.log('unsubscribed!');
    };

    const userSignout = async () => {
      await signout();
      root.$router.push({
        name: 'Home',
      });
      clearProfile();
    };

    return {
      userSignout,
      subscribed,
      unsubscribe,
    };
  },
});
</script>
