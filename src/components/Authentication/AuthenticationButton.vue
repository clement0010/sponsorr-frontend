<template>
  <v-dialog v-model="dialog" width="unset">
    <template #activator="{ on, attrs }">
      <v-btn
        class="text-lowercase font-weight-regular"
        rounded
        outlined
        v-bind="attrs"
        :ripple="false"
        :color="color"
        v-on="on"
      >
        sign up
      </v-btn>
    </template>

    <v-card width="auto">
      <v-card-title class="justify-center">
        sign up as
      </v-card-title>
      <v-card-actions class="justify-center">
        <router-link :to="{ name: 'SignUp', params: { role: 'event-organiser' } }">
          <v-btn class="accent1">
            <span class="white--text">Event Organiser</span>
          </v-btn>
        </router-link>

        <v-divider vertical class="mx-3" />

        <router-link :to="{ name: 'SignUp', params: { role: 'sponsor' } }">
          <v-btn class="accent2">
            <span class="white--text">Sponsor</span>
          </v-btn>
        </router-link>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'AuthenticationButton',
  props: {
    color: {
      type: String,
      default: 'white',
    },
  },
  setup() {
    const dialog = ref(false);
    return {
      dialog,
    };
  },
});
</script>
