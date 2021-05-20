<template>
  <BasePage>
    <ProfileLayout
      :urlPic="profile.picture"
      :name="profile.name"
      :id="profile.id"
      :about="profile.about"
      :keywords="keywords"
      :link="profile.link"
      :location="profile.location"
      :email="profile.email"
      :phone="profile.phone"
    />
  </BasePage>
</template>

<script lang="ts">
import BasePage from '@/layouts/BasePage.vue';
import ProfileLayout from '@/layouts/ProfileLayout.vue';

import { profile, keywords } from '@/utils/profile';

import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'Profile',
  components: {
    BasePage,
    ProfileLayout,
  },
  setup() {
    return {
      profile,
      keywords,
    };
  },
});
</script>
