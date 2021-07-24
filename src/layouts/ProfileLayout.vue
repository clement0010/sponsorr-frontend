<template>
  <v-container class="secondary" fluid>
    <v-row justify="center">
      <v-card width="1320px" color="transparent" class="my-16 px-6" flat>
        <v-row align="center" justify="center">
          <v-col align="center" justify="center" cols="auto">
            <DisplayPicture :is-owner="isOwner" :display-picture="displayPicture" />
          </v-col>
          <v-col>
            <Title :name="name" />
          </v-col>
        </v-row>

        <v-row>
          <About :is-owner="isOwner" :about="about" />
        </v-row>

        <v-row>
          <Keywords :is-owner="isOwner" :keywords="keywords" />
        </v-row>

        <v-row>
          <Contact
            :is-owner="isOwner"
            :email="email"
            :phone-number="phoneNumber"
            :contact="contact"
          />
        </v-row>
      </v-card>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import About from '@/components/PageComponents/Profile/About.vue';
import Contact from '@/components/PageComponents/Profile/Contact.vue';
import DisplayPicture from '@/components/PageComponents/Profile/DisplayPicture.vue';
import Keywords from '@/components/PageComponents/Profile/Keywords.vue';
import Title from '@/components/PageComponents/Profile/Title.vue';

import { Profile } from '@/types';

import { computed, defineComponent, toRefs } from '@vue/composition-api';

export default defineComponent({
  name: 'ProfileLayout',
  components: {
    About,
    Contact,
    DisplayPicture,
    Keywords,
    Title,
  },
  props: {
    isOwner: {
      type: Boolean,
      required: true,
    },
    profile: {
      type: Object as () => Profile,
      required: true,
    },
  },
  setup(props) {
    const { profile } = toRefs(props);

    return {
      name: computed(() => profile.value.name),
      displayPicture: computed(() => profile.value.displayPicture),
      about: computed(() => profile.value.about),
      keywords: computed(() => profile.value.keywords),
      email: computed(() => profile.value.email),
      phoneNumber: computed(() => profile.value.phoneNumber),
      contact: computed(() => profile.value.contact),
    };
  },
});
</script>
