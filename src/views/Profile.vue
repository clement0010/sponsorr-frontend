<template>
  <BasePage>
    <ProfileLayout
      :urlPic="dummyProfile.picture"
      :name="dummyProfile.name"
      :id="dummyProfile.id"
      :about="dummyProfile.about"
      :keywords="keywords"
      :link="dummyProfile.link"
      :location="dummyProfile.location"
      :email="dummyProfile.email"
      :phone="dummyProfile.phone"
    />
  </BasePage>
</template>

<script lang="ts">
import BasePage from '@/layouts/BasePage.vue';
import ProfileLayout from '@/layouts/ProfileLayout.vue';

import { dummyProfile, keywords } from '@/utils/profile';

import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'Profile',
  components: {
    BasePage,
    ProfileLayout,
  },
  setup() {
    return {
      dummyProfile,
      keywords,
    };
  },
});
</script>
