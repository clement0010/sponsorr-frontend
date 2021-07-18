<template>
  <BasePage>
    <Spinner v-if="loading && !error && !profile" />
    <ProfileNotFound v-if="error" />
    <ProfileLayout v-if="!loading && !error && profile" :is-owner="isOwner" :profile="profile" />
  </BasePage>
</template>

<script lang="ts">
import BasePage from '@/layouts/BasePage.vue';
import ProfileLayout from '@/layouts/ProfileLayout.vue';
import ProfileNotFound from '@/layouts/ProfileNotFound.vue';
import Spinner from '@/components/BuildingElements/Spinner.vue';

import useAuth from '@/composable/authComposition';
import useProfile from '@/composable/profileComposition';
import useVisitProfile from '@/composable/visitProfileComposition';

import { computed, defineComponent, onBeforeMount } from '@vue/composition-api';

export default defineComponent({
  name: 'Profile',
  components: {
    BasePage,
    Spinner,
    ProfileLayout,
    ProfileNotFound,
  },
  setup(_, { root }) {
    const { uid } = useAuth();
    const profileId = root.$route.params.id;
    const isOwner = computed(() => profileId === uid.value);

    if (isOwner.value) {
      const { loading, error, profile } = useProfile();
      return {
        loading,
        error,
        profile,
        isOwner,
      };
    }

    const { loading, error, profile, fetchUserProfile } = useVisitProfile();

    onBeforeMount(async () => {
      await fetchUserProfile(profileId);
    });

    return {
      loading,
      error,
      profile,
      isOwner,
    };
  },
});
</script>

<style scoped>
.content {
  max-width: 1320px;
}
</style>
