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

import { Profile } from '@/types';

import { defineComponent, reactive } from '@vue/composition-api';

export default defineComponent({
  name: 'Profile',
  components: {
    BasePage,
    ProfileLayout,
  },
  setup() {
    const profile: Profile = reactive({
      id: '01',
      name: 'The FooBar Society',
      email: 'marketing@foobar.org.sg',
      about: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      phone: '+65 12345678',
      link: 'https://vuejs.org/v2/guide/components-props.html',
      location: 'https://maps.google.com.sg/',
      picture: 'https://randomuser.me/api/portraits/med/men/31.jpg',
    });

    const keywords: string[] = [
      'National University of Singapore',
      'College/University',
      'Women',
      'Sports',
      'Charity',
      'Health',
    ];

    return {
      profile,
      keywords,
    };
  },
});
</script>
