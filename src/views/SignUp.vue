<template>
  <AuthenticationLayout>
    <FormSignUpOrganiser
      v-if="$route.params.role === 'event-organiser'"
      justify="center"
      align="center"
    />
    <FormSignUpSponsor v-else justify="center" align="center" />
  </AuthenticationLayout>
</template>

<script lang="ts">
import AuthenticationLayout from '@/layouts/AuthenticationLayout.vue';
import FormSignUpOrganiser from '@/components/Forms/Authentication/FormSignUpOrganiser.vue';
import FormSignUpSponsor from '@/components/Forms/Authentication/FormSignUpSponsor.vue';

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
