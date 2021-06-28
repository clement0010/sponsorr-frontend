<template>
  <v-container>
    <v-hover>
      <template #default="{ hover }">
        <v-avatar size="200">
          <v-img v-if="!urlPic" src="@/assets/icon-profile.svg" />
          <v-img v-else :src="urlPic" />
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
      :url-pic="urlPic"
      :dialog="dialog"
      @toggle="toggleDialog"
      @edit-display-picture="(payload) => $emit('edit', payload)"
    />
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';

import EditDisplayPicture from '@/components/UserActions/EditDisplayPicture.vue';

export default defineComponent({
  name: 'ProfileDisplayPicture',
  components: {
    EditDisplayPicture,
  },
  props: {
    urlPic: {
      type: String,
      required: true,
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
