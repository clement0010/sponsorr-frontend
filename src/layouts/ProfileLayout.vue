<template>
  <v-container class="secondary" fluid>
    <v-row justify="center">
      <v-card max-width="1320px" color="transparent" class="my-16" flat>
        <v-row align="center" justify="center">
          <v-col align="center" justify="center" cols="auto">
            <DisplayPicture @edit="(payload) => $emit('edit', payload)" />
          </v-col>
          <v-col>
            <Title />
          </v-col>
        </v-row>

        <v-row>
          <About @edit="(payload) => $emit('edit', payload)" />
        </v-row>

        <v-row>
          <Keywords @edit="(payload) => $emit('edit', payload)" />
        </v-row>

        <v-row>
          <Contact @edit="(payload) => $emit('edit', payload)" />
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

import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'ProfileLayout',
  components: {
    About,
    Contact,
    DisplayPicture,
    Keywords,
    Title,
  },
});
</script>
