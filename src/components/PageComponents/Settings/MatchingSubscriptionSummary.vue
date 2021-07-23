<template>
  <v-card flat>
    <v-card-title>
      Status: Subscribed 👍
    </v-card-title>
    <v-card-title class="text-decoration-underline">
      Summary
    </v-card-title>
    <v-card-text>
      Budget:
      {{
        `${currencyFormatter.format(budget.minimum)} - ${currencyFormatter.format(budget.maximum)}`
      }}
      <br />
      Event size: {{ eventSize }}
      <br />
      Demographics: {{ demographic.join(', ') }}
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { currencyFormatter } from '@/common/utils';
import useProfile from '@/composable/profileComposition';
import { Sponsor } from '@/types';
import { defineComponent, toRefs } from '@vue/composition-api';

export default defineComponent({
  name: 'MatchingSubscriptionSummary',
  setup() {
    const { profile } = useProfile();
    const { subscription } = toRefs(profile.value as Sponsor);

    return {
      ...subscription.value,
      currencyFormatter,
    };
  },
});
</script>
