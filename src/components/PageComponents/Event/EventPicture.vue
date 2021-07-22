<template>
  <v-card>
    <v-hover>
      <template #default="{ hover }">
        <v-card class="mx-auto">
          <v-img v-if="picture" :src="picture" height="150" />
          <v-img
            v-else
            src="https://firebasestorage.googleapis.com/v0/b/sponsorr-dev.appspot.com/o/public_assets%2Fimage-placeholder.svg?alt=media&token=076e81e1-858d-4e5f-9937-a7e247baf838"
            height="150"
          />

          <v-fade-transition>
            <v-overlay v-if="hover" absolute color="#036358">
              <v-btn v-if="isOwner" icon :disabled="status !== 'draft'" @click="toggleDialog">
                <v-icon>
                  mdi-pencil
                </v-icon>
              </v-btn>
              <v-btn icon @click="togglePicture">
                <v-icon>
                  mdi-eye
                </v-icon>
              </v-btn>
            </v-overlay>
          </v-fade-transition>
        </v-card>
      </template>
    </v-hover>
    <EditEventPicture
      v-if="isOwner"
      :dialog="dialog"
      @toggle="toggleDialog"
      @edit-picture="(payload) => $emit('edit', payload)"
    />
    <v-dialog v-model="open">
      <v-img v-if="picture" :src="picture" />
      <v-img
        v-else
        src="https://firebasestorage.googleapis.com/v0/b/sponsorr-dev.appspot.com/o/public_assets%2Fimage-placeholder.svg?alt=media&token=076e81e1-858d-4e5f-9937-a7e247baf838"
      />
    </v-dialog>
  </v-card>
</template>

<script lang="ts">
import EditEventPicture from '@/components/EventActions/EditEventPicture.vue';

import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'EventPicture',
  components: {
    EditEventPicture,
  },
  props: {
    isOwner: {
      type: Boolean,
      required: true,
    },
    picture: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      required: true,
    },
  },
  setup() {
    const dialog = ref(false);
    const open = ref(false);

    const toggleDialog = () => {
      dialog.value = !dialog.value;
    };

    const togglePicture = () => {
      open.value = !open.value;
    };

    return {
      dialog,
      open,
      toggleDialog,
      togglePicture,
    };
  },
});
</script>
