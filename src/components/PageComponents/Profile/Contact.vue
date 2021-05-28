<template>
  <v-card
    color="transparent"
    flat
  >
    <v-list color="transparent">
      <v-list-item>
        <v-icon color="black">
          mdi-link
        </v-icon>
        <v-card-text>
          <a
            class="pa-2"
            :href="contact.websiteUrl"
          >
            {{ contact.websiteUrl }}
          </a>
        </v-card-text>
      </v-list-item>

      <v-list-item>
        <v-icon color="black">
          mdi-map-marker
        </v-icon>
        <v-card-text>
          <a
            class="pa-2"
            :href="contact.location"
          >
            {{ contact.location }}
          </a>
        </v-card-text>
      </v-list-item>

      <v-list-item>
        <v-icon color="black">
          mdi-email
        </v-icon>
        <v-card-text>
          <a
            class="pa-2"
            :href="'mailto:' + email"
          >
            {{ email }}
          </a>
        </v-card-text>
      </v-list-item>

      <v-list-item>
        <v-icon color="black">
          mdi-cellphone
        </v-icon>
        <v-card-text class="black--text">
          {{ phoneNumber }}
        </v-card-text>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import { Contact } from '@/types';

export default {
  props: {
    contact: {
      type: Object as () => Contact,
      required: true,
      default(): Contact {
        return {
          location: 'https://maps.google.com.sg/',
          websiteUrl: 'https://vuejs.org/v2/guide/components-props.html',
        };
      },
    },
    phoneNumber: {
      type: String,
      required: true,
      default: '65 89097488',
    },
    email: {
      type: String,
      required: true,
      default: 'test@gmail.com',
    },

  },
};
</script>

<style scoped>
.v-card__text {
  word-break: normal;
}
</style>
