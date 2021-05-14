<template>
  <BasePage>
    <template v-slot:navigation>
      <NavigationBarUser />
    </template>
    <ProfileLayout>
      <template v-slot:profile>
        <v-img :src="profile.picture"></v-img>
      </template>
      <template v-slot:name> {{ profile.name }} </template>
      <template v-slot:ID> {{ profile.id }} </template>
      <template v-slot:about>
        {{ profile.about }}
      </template>
      <template v-slot:keywords>
        <v-chip class="ma-1" v-for="keyword in keywords" :key="keyword">
          {{ keyword }}
        </v-chip>
      </template>
      <template v-slot:link>
        <a :href="profile.link" target=_blank> {{ profile.link }} </a>
      </template>
      <template v-slot:location>
        <a :href="profile.location" target=_blank> {{ profile.location }} </a>
      </template>
      <template v-slot:email>
        <a :href="'mailto'+ profile.email"> {{ profile.email }} </a>
      </template>
      <template v-slot:phone> {{ profile.phone }}  </template>
    </ProfileLayout>
  </BasePage>
</template>

<script lang="ts">
import BasePage from '@/layouts/BasePage.vue';
import NavigationBarUser from '@/components/Navigations/NavigationBarUser.vue';
import ProfileLayout from '@/layouts/ProfileLayout.vue';

import { Profile } from '@/types';

import {
  defineComponent, reactive,
} from '@vue/composition-api';

export default defineComponent({
  name: 'Profile',
  components: {
    BasePage,
    NavigationBarUser,
    ProfileLayout,
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
