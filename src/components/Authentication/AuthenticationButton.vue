<template>
  <v-dialog v-model="dialog" light width="unset">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="text-lowercase font-weight-regular"
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
        class="text-lowercase font-weight-regular"
        rounded
        outlined
        v-bind="attrs"
        v-on="on"
        v-if="action === 'SignUp'"
        :ripple="false"
      >
        sign up
      </v-btn>
    </template>

    <v-card width="auto">
      <v-card-title>
        {{ action === 'Login' ? 'login' : 'sign up' }} as
      </v-card-title>
      <v-card-actions>
        <router-link :to="{ name: action, params: { role: 'event-organiser' } }">
          <v-btn class="accent1">
            <span class="white--text">Event Organiser</span>
          </v-btn>
        </router-link>
        <router-link :to="{ name: action, params: { role: 'sponsor' } }">
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
  props: {
    action: {
      type: String,
      default: 'login',
      enum: ['Login', 'SignUp'],
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
