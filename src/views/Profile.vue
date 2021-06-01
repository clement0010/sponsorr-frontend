<template>
  <BasePage>
    <Spinner v-if="loading && !error" />
    <p v-else-if="error">Error loading profile</p>
    <ProfileLayout v-else :profile="profile" @edit="edit" />
  </BasePage>
</template>

<script lang="ts">
import BasePage from '@/layouts/BasePage.vue';
import ProfileLayout from '@/layouts/ProfileLayout.vue';
import Spinner from '@/components/BuildingElements/Spinner.vue';

import useProfile from '@/composable/profileComposition';

import { defineComponent, onMounted } from '@vue/composition-api';

export default defineComponent({
  name: 'Profile',
  components: {
    ProfileLayout,
    Spinner,
    BasePage,
  },
  setup(_, { root, emit }) {
    const { profile, fetchUserProfile, editUserProfile, loading, error } = useProfile();

    const uid = root.$route.params.id;

    onMounted(async () => {
      await fetchUserProfile(uid);
    });

    const edit = async (payload: Record<string, unknown>) => {
      try {
        await editUserProfile(uid, payload);
        emit('success', 'Successfully edited!');
      } catch (err) {
        emit('alert', 'Failed to edit!');
        console.error(err);
      }
    };

    return {
      profile,
      loading,
      edit,
      error,
    };
  },
});
</script>

<style scoped>
.content {
  max-width: 1320px;
}
</style>
