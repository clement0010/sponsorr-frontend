<template>
  <AuthenticationLayout>
    <FormSignUpOrganiser
      v-if="$route.params.role === 'event-organiser'"
      @alert="(payload) => $emit('alert', payload)"
      @success="(payload) => $emit('success', payload)"
    />
    <FormSignUpSponsor
      v-else
      @alert="(payload) => $emit('alert', payload)"
      @success="(payload) => $emit('success', payload)"
    />
  </AuthenticationLayout>
</template>

<script lang="ts">
import AuthenticationLayout from '@/layouts/AuthenticationLayout.vue';
import FormSignUpOrganiser from '@/components/Forms/FormSignUpOrganiser.vue';
import FormSignUpSponsor from '@/components/Forms/FormSignUpSponsor.vue';

import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'SignUp',
  components: {
    AuthenticationLayout,
    FormSignUpOrganiser,
    FormSignUpSponsor,
  },
});
</script>
