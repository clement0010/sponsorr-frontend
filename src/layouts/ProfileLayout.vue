<template>
  <v-container
    class="secondary"
    fluid
  >
    <v-row justify="center">
      <v-card
        max-width="1320px"
        color="transparent"
        class="my-16"
        flat
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            align="center"
            justify="center"
            cols="auto"
          >
            <DisplayPicture :url-pic="profile.displayPicture" />
          </v-col>
          <v-col>
            <Title :name="profile.name" />
            <IdentificationNumber :id="profile.uen" />
          </v-col>
        </v-row>

        <v-row>
          <About
            :about="profile.about"
            @edit="payload => $emit('edit', payload)"
          />
        </v-row>

        <v-row>
          <Keywords
            :keywords="profile.keywords"
            @edit="payload => $emit('edit', payload)"
          />
        </v-row>

        <v-row>
          <Contact
            :email="profile.email"
            :contact="profile.contact"
            :phone-number="profile.phoneNumber"
            @edit="payload => $emit('edit', payload)"
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
import IdentificationNumber from '@/components/PageComponents/Profile/IdentificationNumber.vue';
import Keywords from '@/components/PageComponents/Profile/Keywords.vue';
import Title from '@/components/PageComponents/Profile/Title.vue';

import { Profile } from '@/types';

import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'ProfileLayout',
  props: {
    profile: {
      type: Object as () => Profile,
      required: true,
    },
  },
  components: {
    About,
    Contact,
    DisplayPicture,
    IdentificationNumber,
    Keywords,
    Title,
  },
});
</script>
