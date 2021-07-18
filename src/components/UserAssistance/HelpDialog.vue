<template>
  <v-dialog width="500" scrollable>
    <template #activator="{on: dialog, attrs}">
      <v-tooltip bottom>
        <template #activator="{on: tooltip}">
          <v-icon :color="color" v-bind="attrs" v-on="{ ...dialog, ...tooltip }">
            mdi-help-circle-outline
          </v-icon>
        </template>
        <span>Get Help</span>
      </v-tooltip>
    </template>

    <v-card>
      <v-card-title>
        Welcome to Sponsorr!
      </v-card-title>
      <v-card-text>
        <strong>
          Profile:
        </strong>
        Here is where your organisation's details are displayed. Click on the
        <v-icon>
          mdi-pencil
        </v-icon>
        button to make changes!
      </v-card-text>

      <v-card-text v-if="role === 'EventOrganiser'">
        <strong>
          Dashboard:
        </strong>
        Manage your organisation's events here! Publish, unpublish, and delete your event quickly by
        clicking the action buttons. Create your first event by clicking the "Create new event"
        button.
      </v-card-text>

      <v-card-text v-if="role === 'Sponsor'">
        <strong>
          Matches:
        </strong>
        Manage your organisation's matches here! Accept or reject events quickly by clicking the
        action buttons.
      </v-card-text>

      <v-card-text>
        <strong>
          Analytics:
        </strong>
        Take a look at some interesting numbers and charts!
      </v-card-text>

      <v-card-text v-if="role === 'Sponsor'">
        <strong>
          Marketplace:
        </strong>
        Search, view, and apply for events through the marketplace!
      </v-card-text>

      <v-card-text v-if="role === 'Sponsor'">
        <strong>
          Settings:
        </strong>
        Set your event matching preferences here!
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { role } from '@/composable/store';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'HelpDialog',
  props: {
    color: {
      type: String,
      default: 'white',
    },
  },
  setup() {
    return {
      role,
    };
  },
});
</script>
