<template>
  <v-dialog v-model="dialog" max-width="500">
    <template #activator="{ on, attrs }">
      <v-btn class="error" v-bind="attrs" small v-on="on"> Delete Event </v-btn>
    </template>

    <v-card>
      <v-card-title> Delete Event </v-card-title>
      <v-card-text>
        <span> Are you sure you want to delete the event: "{{ eventTitle }}" ?</span>
        <br />
        <span> This action is <strong>irreversible</strong>.</span>
      </v-card-text>
      <v-card-actions>
        <v-btn class="error" @click="deleteEvent"> Delete Event Permanently </v-btn>

        <v-btn @click="cancel"> Cancel </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'DeleteEventButton',
  props: {
    eventTitle: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const dialog = ref(false);

    const deleteEvent = (): void => {
      dialog.value = false;
      emit('deleteEvent', 'Event deleted');
    };

    const cancel = () => {
      dialog.value = false;
    };

    return {
      dialog,
      cancel,
      deleteEvent,
    };
  },
});
</script>
