<template>
  <div>
    <v-row class="ma-0">
      <v-col cols="auto" class="pa-0">
        <v-card-subtitle class="text-h5">
          {{ user }}
        </v-card-subtitle>
      </v-col>
      <v-spacer />
      <v-col v-if="!isOwner" cols="auto">
        <router-link :to="{ name: 'Profile', params: { id: ownerId } }">
          <v-btn>
            View Event Organiser
          </v-btn>
        </router-link>
      </v-col>
      <v-col v-if="!isOwner" cols="auto">
        <v-btn>
          View My Offers
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'EventOrganiser',
  props: {
    user: {
      type: String,
      required: true,
    },
    isOwner: {
      type: Boolean,
      default: true,
    },
    ownerId: {
      type: String,
      default: '',
    },
  },
});
</script>
