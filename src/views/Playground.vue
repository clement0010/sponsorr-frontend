<template>
  <BasePage>
    <v-container fluid class="white">
      <DisplayPicture :url="profile.picture" />
      <Title :name="profile.name" />
      <IdentificationNumber :id="profile.id" />
      <About :about="profile.about" />
      <Keywords :keywords="keywords" />
      <Contact
        :email="profile.email"
        :link="profile.link"
        :location="profile.location"
        :phone="profile.phone"
      />
    </v-container>
  </BasePage>
</template>

<script lang="ts">
import BasePage from '@/layouts/BasePage.vue';
import NavigationBarUser from '@/components/Navigations/NavigationBarUser.vue';
import ProfileLayout from '@/layouts/ProfileLayout.vue';

import { Profile } from '@/types';

import { defineComponent, reactive } from '@vue/composition-api';
import Title from '@/components/PageComponents/Profile/Title.vue';
import IdentificationNumber from '@/components/PageComponents/Profile/IdentificationNumber.vue';
import About from '@/components/PageComponents/Profile/About.vue';
import DisplayPicture from '@/components/PageComponents/Profile/DisplayPicture.vue';
import Keywords from '@/components/PageComponents/Profile/Keywords.vue';
import Contact from '@/components/PageComponents/Profile/Contact.vue';

export default defineComponent({
  name: 'Profile',
  components: {
    BasePage,
    NavigationBarUser,
    ProfileLayout,
    Title,
    IdentificationNumber,
    About,
    DisplayPicture,
    Keywords,
    Contact,
  },
  setup() {
    const profile: Profile = reactive({
      id: '01',
      name: 'The FoorBar Society',
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
