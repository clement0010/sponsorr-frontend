<template>
  <v-card color="transparent" flat>
    <v-card-title class="text-h4 black--text">
      Contact
      <EditContact @edit-contact="(payload) => $emit('edit', payload)" />
    </v-card-title>
    <v-list color="transparent">
      <v-list-item>
        <v-icon color="black"> mdi-link </v-icon>
        <v-card-text>
          <a class="pa-2" :href="websiteUrl">
            {{ websiteUrl }}
          </a>
        </v-card-text>
      </v-list-item>

      <v-list-item>
        <v-icon color="black"> mdi-map-marker </v-icon>
        <v-card-text>
          <a class="pa-2" :href="location">
            {{ location }}
          </a>
        </v-card-text>
      </v-list-item>

      <v-list-item>
        <v-icon color="black"> mdi-email </v-icon>
        <v-card-text>
          <a class="pa-2" :href="'mailto:' + email">
            {{ email }}
          </a>
        </v-card-text>
      </v-list-item>

      <v-list-item>
        <v-icon color="black"> mdi-cellphone </v-icon>
        <v-card-text class="black--text">
          {{ phoneNumber }}
        </v-card-text>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import EditContact from '@/components/UserActions/EditContact.vue';

import useProfile from '@/composable/profileComposition';

import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'ProfileContact',
  components: {
    EditContact,
  },
  setup() {
    const { phoneNumber, email, location, websiteUrl } = useProfile();

    return {
      phoneNumber,
      email,
      location,
      websiteUrl,
    };
  },
});
</script>

<style scoped>
.v-card__text {
  word-break: normal;
}
</style>
