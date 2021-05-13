<template>
  <BasePage>
    <template v-slot:navigation>
      <NavigationBarUser />
    </template>
    <ProfileLayout>
      <template v-slot:profile>
        <v-img src="@/assets/icon-profile.svg"></v-img>
      </template>
      <template v-slot:name>
        The FooBar Society
      </template>
      <template v-slot:ID>
        000001
      </template>
      <template v-slot:about>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </template>
      <template v-slot:keywords>
        <v-chip class="ma-1" v-for="keyword in keywords" :key="keyword">
          {{ keyword }}
        </v-chip>
      </template>
      <template v-slot:link>
        <router-link to="#">
          www.foobarsociety.org.sg
        </router-link>
      </template>
      <template v-slot:location>
        <router-link to="#">
          link to Google Maps
        </router-link>
      </template>
      <template v-slot:email>
        <router-link to="#">
          marketing@foobar.org.sg
        </router-link>
      </template>
      <template v-slot:phone>
        +65 12345678
      </template>
    </ProfileLayout>
  </BasePage>
</template>

<script lang="ts">
import BasePage from '@/layouts/BasePage.vue';
import NavigationBarUser from '@/components/Navigations/NavigationBarUser.vue';
import ProfileLayout from '@/layouts/ProfileLayout.vue';

const keywords: string[] = [
  'National University of Singapore',
  'College/University',
  'Women',
  'Sports',
  'Charity',
  'Health',
];

export default {
  components: {
    BasePage,
    NavigationBarUser,
    ProfileLayout,
  },
  data() {
    return {
      keywords,
    };
  },
};
</script>
