<template>
  <BasePage>
    <Spinner v-if="loading && !error" />
    <p v-if="error">Error loading profile</p>
    <ProfileLayout v-if="!loading && !error && profile" @edit="edit" />
  </BasePage>
</template>

<script lang="ts">
import BasePage from '@/layouts/BasePage.vue';
import ProfileLayout from '@/layouts/ProfileLayout.vue';
import Spinner from '@/components/BuildingElements/Spinner.vue';

import useAuth from '@/composable/authComposition';
import useProfile from '@/composable/profileComposition';

import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'Profile',
  components: {
    BasePage,
    Spinner,
    ProfileLayout,
  },
  setup(_, { emit }) {
    const { editUserProfile, loading, error, profile } = useProfile();
    const { uid } = useAuth();

    const edit = async (payload: Record<string, unknown>) => {
      try {
        await editUserProfile(uid.value, payload);
        emit('success', 'Successfully edited!');
      } catch (err) {
        emit('alert', 'Failed to edit!');
        console.error(err);
      }
    };

    return {
      profile,
      loading,
      error,
      edit,
    };
  },
});
</script>

<style scoped>
.content {
  max-width: 1320px;
}
</style>
