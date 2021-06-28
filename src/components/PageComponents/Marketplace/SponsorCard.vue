<template>
  <v-card max-width="400">
    <v-card-title>
      {{ sponsor.name }}
    </v-card-title>
    <v-card-subtitle>
      {{ sponsor.contact.location }}
    </v-card-subtitle>
    <v-img class=" align-end" height="200px" :src="sponsor.displayPicture" />
    <v-card-text class="text-truncate">
      {{ sponsor.about }}
    </v-card-text>
    <v-card-actions>
      <v-btn text class="primary--text">
        View
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Sponsor } from '@/types';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'SponsorCard',
  props: {
    sponsor: {
      type: Object as () => Sponsor,
      required: true,
    },
  },
});
</script>
