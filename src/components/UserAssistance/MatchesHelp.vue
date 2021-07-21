<template>
  <v-dialog width="500" scrollable>
    <template #activator="{ on: dialog, attrs }">
      <v-tooltip bottom>
        <template #activator="{ on: tooltip }">
          <v-icon :color="'white'" v-bind="attrs" class="mx-4" v-on="{ ...dialog, ...tooltip }">
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
        My Matches
      </v-card-title>
      <v-card-text>
        Your matches are sorted into 3 categories:
      </v-card-text>
      <v-card-text>
        <strong>
          Pending:
        </strong>
        <br />
        These matches are either
        <br />
        1. assigned to you by our algorithm,
        <br />
        2. generated from the events you applied for,
        <br />
        and either the sponsor (you) or the event organiser, or both has yet to accept the match.
      </v-card-text>
      <v-card-text>
        <strong>
          Rejected:
        </strong>
        <br />
        These matches have been rejected by you or the event organiser.
      </v-card-text>
      <v-card-text>
        <strong>
          Accepted:
        </strong>
        <br />
        These matches have been accepted by both you and the event organiser.
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'MatchesHelp',
});
</script>
