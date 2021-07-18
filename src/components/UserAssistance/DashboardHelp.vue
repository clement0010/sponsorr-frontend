<template>
  <v-dialog width="500" scrollable>
    <template #activator="{ on: dialog, attrs }">
      <v-tooltip bottom>
        <template #activator="{ on: tooltip }">
          <v-icon :color="color" v-bind="attrs" class="mx-4" v-on="{ ...dialog, ...tooltip }">
            mdi-help-circle-outline
          </v-icon>
        </template>
        <span>
          Get Help
        </span>
      </v-tooltip>
    </template>

    <v-card>
      <v-card-title>
        Dashboard
      </v-card-title>
      <v-card-text>
        The events you own are sorted into 3 categories:
      </v-card-text>
      <v-card-text>
        <strong>
          Published:
        </strong>
        These events are published to the marketplace but have yet to obtain a match. You can freely
        delete or unpublish these events.
      </v-card-text>
      <v-card-text>
        <strong>
          Matched:
        </strong>
        These events are matched with a sponsor. You cannot delete or unpublish these events
        anymore.
      </v-card-text>
      <v-card-text>
        <strong>
          Drafts:
        </strong>
        These events are not published. You can freely publish or delete these events.
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'DashboardHelp',
});
</script>
