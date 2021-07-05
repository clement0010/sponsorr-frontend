<template>
  <v-container>
    <v-hover>
      <template #default="{ hover }">
        <v-avatar size="200">
          <v-img v-if="!displayPicture" src="@/assets/icon-profile.svg" />
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
    <EditDisplayPicture
      :dialog="dialog"
      @toggle="toggleDialog"
      @edit-display-picture="(payload) => $emit('edit', payload)"
    />
  </v-container>
</template>

<script lang="ts">
import EditDisplayPicture from '@/components/UserActions/EditDisplayPicture.vue';

import useProfile from '@/composable/profileComposition';
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'ProfileDisplayPicture',
  components: {
    EditDisplayPicture,
  },
  setup() {
    const { displayPicture } = useProfile();

    const dialog = ref(false);

    const toggleDialog = () => {
      dialog.value = !dialog.value;
    };

    return {
      displayPicture,
      dialog,
      toggleDialog,
    };
  },
});
</script>
