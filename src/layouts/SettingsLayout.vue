<template>
  <v-container fluid class="secondary">
    <v-container class="content">
      <v-row align="center">
        <v-col cols="auto">
          <v-card-title class="text-sm-h2 text-h3">
            Settings
          </v-card-title>
        </v-col>
      </v-row>

      <v-tabs v-model="tab" class="elevation-5 rounded-t-lg">
        <v-tabs-slider color="blue" />
        <v-tab>
          Matching Service
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab" class="elevation-5 rounded-b-lg">
        <v-tab-item>
          <v-card-text>
            <FormSubscribeMatching v-if="!subscribed" @subscribe="subscribe" />
            <v-btn v-else class="error mx-0" @click="unsubscribe">
              Unsubscribe from Matching Service
            </v-btn>
          </v-card-text>
          <MatchingSubscriptionSummary v-if="subscribed" />
        </v-tab-item>
      </v-tabs-items>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import FormSubscribeMatching from '@/components/Forms/Subscription/FormSubscribeMatching.vue';
import MatchingSubscriptionSummary from '@/components/PageComponents/Settings/MatchingSubscriptionSummary.vue';

import useAuth from '@/composable/authComposition';
import useProfile from '@/composable/profileComposition';

import { Sponsor } from '@/types';
import { defineComponent, toRefs, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'SettingsLayout',
  components: {
    FormSubscribeMatching,
    MatchingSubscriptionSummary,
  },
  setup() {
    const { uid } = useAuth();
    const { profile, editUserProfile } = useProfile();
    const tab = ref(0);

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
      tab,
    };
  },
});
</script>

<style scoped>
.content {
  min-height: 100vh;
}
</style>
