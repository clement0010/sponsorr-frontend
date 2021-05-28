<template>
  <BasePage>
    <Spinner v-if="loading" />
    <ProfileLayout
      v-else
      :profile="profile"
    />
  </BasePage>
</template>

<script lang="ts">
import BasePage from '@/layouts/BasePage.vue';
import ProfileLayout from '@/layouts/ProfileLayout.vue';
import Spinner from '@/components/BuildingElements/Spinner.vue';

import useProfile from '@/composable/profileComposition';

import {
  defineComponent, onMounted,
} from '@vue/composition-api';

export default defineComponent({
  name: 'Profile',
  components: {
    ProfileLayout,
    Spinner,
    BasePage,
  },
  setup(_, { root }) {
    const {
      profile,
      fetchUserProfile,
      loading,
    } = useProfile();

    const uid = root.$route.params.id;

    onMounted(async () => {
      await fetchUserProfile(uid);
    });

    return {
      profile,
      loading,
    };
  },
});
</script>

<style scoped>
.content {
  max-width: 1320px;
}
</style>
