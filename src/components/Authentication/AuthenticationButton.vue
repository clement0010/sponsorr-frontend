<template>
  <v-dialog v-model="dialog" light width="unset" :fullscreen="$vuetify.breakpoint.xsOnly">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="text-lowercase font-weight-regular white--text"
        color="transparent"
        rounded
        text
        v-bind="attrs"
        v-on="on"
        v-if="action === 'Login'"
        :ripple="false"
      >
        login
      </v-btn>
      <v-btn
        class="text-lowercase font-weight-regular white--text"
        color="transparent"
        rounded
        outlined
        v-bind="attrs"
        v-on="on"
        v-else
      >
        sign up
      </v-btn>
    </template>

    <v-card width="auto">
      <v-card-title> {{ action === 'Login' ? 'login' : 'sign up' }} as </v-card-title>
      <v-card-actions>
        <v-btn class="accent1">
          <router-link :to="{ name: action, params: { role: 'event-organiser' } }">
            <span class="white--text">Event Organiser</span>
          </router-link>
        </v-btn>
        <v-btn class="accent2">
          <router-link :to="{ name: action, params: { role: 'sponsor' } }">
            <span class="white--text">Sponsor</span>
          </router-link>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  props: {
    action: {
      type: String,
      default: 'login',
      enum: ['Login', 'SignUp'],
    },
  },

  setup() {
    const dialog = ref(false);
    // Sign Up Function

    // Login Function

    return {
      dialog,
    };
  },
});
</script>
