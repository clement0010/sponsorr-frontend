<template>
  <v-container>
    <v-hover :disabled="!isOwner">
      <template #default="{ hover }">
        <v-avatar size="200">
          <v-img
            v-if="!displayPicture"
            src="https://firebasestorage.googleapis.com/v0/b/sponsorr-dev.appspot.com/o/public_assets%2Ficon-profile.svg?alt=media&token=1ddcee8a-2889-43a1-aecd-a8959474814d"
          />
          <v-img v-else :src="displayPicture" />

          <v-fade-transition>
            <v-overlay v-if="hover" absolute color="#036358">
              <v-btn icon @click="toggleDialog">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </v-overlay>
          </v-fade-transition>
        </v-avatar>
      </template>
    </v-hover>
    <EditDisplayPicture v-if="isOwner" :dialog="dialog" @toggle="toggleDialog" />
  </v-container>
</template>

<script lang="ts">
import EditDisplayPicture from '@/components/UserActions/EditDisplayPicture.vue';

import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'ProfileDisplayPicture',
  components: {
    EditDisplayPicture,
  },
  props: {
    isOwner: {
      type: Boolean,
      required: true,
    },
    displayPicture: {
      type: String,
      default: '',
    },
  },
  setup() {
    const dialog = ref(false);

    const toggleDialog = () => {
      dialog.value = !dialog.value;
    };

    return {
      dialog,
      toggleDialog,
    };
  },
});
</script>
