<template>
  <v-container class="secondary content" fluid>
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
              <FormSubscribeMatching v-if="!subscribed" @subscribe="subscribe" />
              <v-btn v-else class="error" @click="unsubscribe">
                Unsubscribe from Matching Service
              </v-btn>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import FormSubscribeMatching from '@/components/Forms/Subscription/FormSubscribeMatching.vue';

import useAuth from '@/composable/authComposition';
import useProfile from '@/composable/profileComposition';
import { Sponsor } from '@/types';

import { defineComponent, toRefs } from '@vue/composition-api';

export default defineComponent({
  name: 'SettingsLayout',
  components: {
    FormSubscribeMatching,
  },
  setup() {
    const { uid } = useAuth();
    const { profile, editUserProfile } = useProfile();

    const { subscribed } = toRefs(profile.value as Sponsor);

    const unsubscribe = async () => {
      console.log('unsubscribed!');
      await editUserProfile(uid.value, {
        subscribed: false,
      });
      subscribed.value = false;
    };

    const subscribe = () => {
      subscribed.value = true;
    };

    return {
      subscribed,
      unsubscribe,
      subscribe,
    };
  },
});
</script>

<style scoped>
.content {
  min-height: 100vh;
}
</style>
