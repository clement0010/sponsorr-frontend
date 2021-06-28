<template>
  <v-dialog :value="dialog" width="500">
    <v-form>
      <v-card>
        <v-card-title> Edit Display Picture </v-card-title>
        <v-card-text>
          <v-text-field v-model="input" label="Enter Image URL" outlined :rules="[validURLRule]" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn class="error" rounded text @click="toggle"> Cancel </v-btn>
          <v-btn
            class="success"
            rounded
            text
            @click="
              {
                edit();
                toggle();
              }
            "
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { validURLRule } from '@/common/validation';

export default defineComponent({
  name: 'EditDisplayPicture',
  props: {
    urlPic: {
      type: String,
      default: () => '',
    },
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const input = ref(props.urlPic);

    const toggle = () => {
      emit('toggle');
      input.value = props.urlPic;
    };

    const edit = () => {
      emit('edit-display-picture', {
        displayPicture: input.value,
      });
    };

    return {
      edit,
      toggle,
      input,
      validURLRule,
    };
  },
});
</script>
