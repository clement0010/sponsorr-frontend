<template>
  <v-card color="white">
    <v-container fill-height>
      <v-row justify="center">
        <About :about="about" />
        <v-btn @click="edit">
          Edit
        </v-btn>
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
