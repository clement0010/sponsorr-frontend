<template>
  <v-card color="white">
    <v-container fill-height>
      <v-row align="center" justify="center">
        <v-card class="white" flat>
          <v-card-title>
            <v-row align="center" justify="center">
              <v-col class="d-flex justify-center" order="first" cols="auto">
                <DisplayPicture :urlPic="profile.picture" />
              </v-col>
              <v-col order="last">
                <Title :name="profile.name" />
                <IdentificationNumber :id="profile.id" />
              </v-col>
            </v-row>
          </v-card-title>
        </v-card>
      </v-row>
      <v-row justify="center">
        <About :about="profile.about" />
        <Keywords :keywords="profile.keywords" />
        <Contact
          :link="profile.link"
          :location="profile.location"
          :email="profile.email"
          :phone="profile.phone"
        />
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import About from '@/components/PageComponents/Profile/About.vue';
import Contact from '@/components/PageComponents/Profile/Contact.vue';
import DisplayPicture from '@/components/PageComponents/Profile/DisplayPicture.vue';
import IdentificationNumber from '@/components/PageComponents/Profile/IdentificationNumber.vue';
import Keywords from '@/components/PageComponents/Profile/Keywords.vue';
import Title from '@/components/PageComponents/Profile/Title.vue';

import { defineComponent } from '@vue/composition-api';

import { profile } from '@/utils/profile';

export default defineComponent({
  name: 'ProfileLayout',
  components: {
    About,
    Contact,
    DisplayPicture,
    IdentificationNumber,
    Keywords,
    Title,
  },
  setup() {
    return { profile };
  },
});
</script>
