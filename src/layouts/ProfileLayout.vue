<template>
  <v-container class="secondary" fluid>
    <v-row justify="center">
      <Title>
        <template v-slot:profile>
          <slot name="profile"></slot>
        </template>
        <template v-slot:name>
          <slot name="name"></slot>
        </template>
        <template v-slot:ID>
          <slot name="ID"></slot>
        </template>
      </Title>
      <About>
        <slot name="about"></slot>
      </About>
      <Keywords>
        <slot name="keywords"></slot>
      </Keywords>
      <Contact>
        <template v-slot:link>
          <slot name="link"></slot>
        </template>
        <template v-slot:location>
          <slot name="location"></slot>
        </template>
        <template v-slot:email>
          <slot name="email"></slot>
        </template>
        <template v-slot:phone>
          <slot name="phone"></slot>
        </template>
      </Contact>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Title from '@/components/PageComponents/Profile/Title.vue';
import About from '@/components/PageComponents/Profile/About.vue';
import Keywords from '@/components/PageComponents/Profile/Keywords.vue';
import Contact from '@/components/PageComponents/Profile/Contact.vue';

export default {
  components: {
    Title,
    About,
    Keywords,
    Contact,
  },
};
</script>
