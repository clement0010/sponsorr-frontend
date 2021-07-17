<template>
  <v-dialog v-model="dialog" max-width="500px" persistent>
    <template #activator="{ on, attrs }">
      <v-btn icon class="mx-5" v-bind="attrs" v-on="on">
        <v-icon color="black"> mdi-pencil </v-icon>
      </v-btn>
    </template>

    <v-form>
      <v-card>
        <v-card-title>
          <span class="headline">
            Edit Keywords
          </span>
        </v-card-title>

        <v-card-text>
          <v-combobox
            v-model="input"
            outlined
            label="Keywords"
            chips
            multiple
            placeholder="Type away and hit 'enter' to save the keyword"
          />
        </v-card-text>

        <v-card-text class="text-right">
          <v-btn class="error" rounded text @click="cancel"> Cancel </v-btn>
          <v-btn class="success" rounded text :disabled="duplicate" @click="edit"> Save </v-btn>
        </v-card-text>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script lang="ts">
import useAuth from '@/composable/authComposition';
import useProfile from '@/composable/profileComposition';

import { computed, defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'EditProfileKeywordsButton',
  props: {
    keywords: {
      type: Array as () => string[],
      default: () => [],
    },
  },
  setup(props) {
    const { uid } = useAuth();
    const { editUserProfile } = useProfile();
    const { keywords } = props;

    const dialog = ref(false);

    const input = ref(keywords);

    const duplicate = computed(
      () =>
        (keywords || [])
          .map((keyword) => (input.value || []).includes(keyword))
          .reduce((accumulator, currentValue) => accumulator && currentValue, true) &&
        (input.value || [])
          .map((keyword) => (keywords || []).includes(keyword))
          .reduce((accumulator, currentValue) => accumulator && currentValue, true),
    );

    const cancel = () => {
      dialog.value = false;
      input.value = keywords;
    };

    const edit = async () => {
      dialog.value = false;
      await editUserProfile(uid.value, {
        keywords: input.value,
      });
    };

    return {
      dialog,
      cancel,
      edit,
      input,
      duplicate,
    };
  },
});
</script>
