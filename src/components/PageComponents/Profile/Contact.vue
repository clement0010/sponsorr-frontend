<template>
  <v-card color="transparent" flat width="75%">
    <v-card-title class="text-h4 black--text">
      Contact
      <EditContact />
    </v-card-title>

    <v-list color="transparent">
      <v-list-item>
        <v-icon color="black">
          mdi-link
        </v-icon>
        <v-card-text>
          <a class="pa-2" :href="link">
            {{ link }}
          </a>
        </v-card-text>
      </v-list-item>

      <v-list-item>
        <v-icon color="black">
          mdi-map-marker
        </v-icon>
        <v-card-text>
          <a class="pa-2" :href="location">
            {{ location }}
          </a>
        </v-card-text>
      </v-list-item>

      <v-list-item>
        <v-icon color="black">
          mdi-email
        </v-icon>
        <v-card-text>
          <a class="pa-2" :href="'mailto:' + email">
            {{ email }}
          </a>
        </v-card-text>
      </v-list-item>

      <v-list-item>
        <v-icon color="black">
          mdi-cellphone
        </v-icon>
        <v-card-text class="black--text">
          {{ phone }}
        </v-card-text>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import EditContact from '@/components/UserActions/EditContact.vue';

export default {
  props: ['link', 'location', 'email', 'phone'],
  components: {
    EditContact,
  },
};
</script>

<style scoped>
.v-card__text {
  word-break: normal;
}
</style>
