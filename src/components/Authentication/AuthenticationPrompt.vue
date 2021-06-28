<template>
  <v-dialog v-model="dialog" width="300">
    <template #activator="{ on, attrs }">
      <v-btn v-bind="attrs" text class="primary--text" v-on="on">
        View
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="justify-center">
        login to continue
      </v-card-title>
      <v-card-actions class="justify-center">
        <router-link :to="{ name: 'Login' }">
          <v-btn class="text-lowercase font-weight-regular " rounded text>
            Login
          </v-btn>
        </router-link>
        <v-divider vertical class="mx-3" />
        <AuthenticationButton :color="'black'" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import AuthenticationButton from '@/components/Authentication/AuthenticationButton.vue';

export default defineComponent({
  name: 'AuthenticationPrompt',
  components: {
    AuthenticationButton,
  },
  setup() {
    const dialog = ref(false);
    return {
      dialog,
    };
  },
});
</script>
