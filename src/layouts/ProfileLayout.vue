<template>
  <v-card color="white">
    <v-container fill-height>
      <!--
      <v-row align="center" justify="center">
        <v-card class="white" flat>
          <v-card-title>
            <v-row align="center" justify="center">
              <v-col class="d-flex justify-center" order="first" cols="auto">
                <DisplayPicture :urlPic="picture" />
              </v-col>
              <v-col order="last">
                <Title :name="name" />
                <IdentificationNumber :id="id" />
              </v-col>
            </v-row>
          </v-card-title>
        </v-card>
      </v-row>
      -->
      <v-row justify="center">
        <About :about="about"/>
        <!--
        <Keywords :keywords="keywords" />
        <Contact
          :link="link"
          :location="location"
          :email="email"
          :phone="phone"
        />
        -->
        <v-btn @click="edit">Edit</v-btn>
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

import { defineComponent, toRefs, isRef } from '@vue/composition-api';

export default defineComponent({
  name: 'ProfileLayout',
  props: {
    about: {
      type: String,
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
  setup(props) {
    const { about } = toRefs(props);
    const edit = () => {
      about.value = '12345';
    };

    return {
      edit,
    };
  },
});
</script>
