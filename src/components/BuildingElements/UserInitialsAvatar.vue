<template>
  <v-menu rounded offset-y>
    <template #activator="{ on }">
      <v-btn icon :disabled="disabled" v-on="on">
        <v-avatar color="#4E5018" size="40">
          <span class="white--text">
            {{ initials }}
          </span>
        </v-avatar>
      </v-btn>
    </template>
    <v-card>
      <v-list-item-content class="justify-center">
        <v-list-item-title>
          <div class="mx-auto text-center">
            <span>
              <v-btn text raised> Signed In ✅ | {{ role }} </v-btn>
            </span>
          </div>
        </v-list-item-title>
      </v-list-item-content>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import { userProfile, role } from '@/composable/store';
import { computed, defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'UserInitialsAvatar',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {
      initials: computed(() =>
        userProfile.value?.name
          .split(' ')
          .map((word: string) => word[0])
          .join('')
          .substring(0, 2),
      ),
      role: computed(() => (role.value === 'Sponsor' ? 'Sponsor' : 'Event Organiser')),
    };
  },
});
</script>
