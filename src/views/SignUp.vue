<template>
  <AuthenticationLayout>
    <!-- <FormSignUpOrganiser /> -->
    <FormSignUpSponsor />
  </AuthenticationLayout>
</template>

<script lang="ts">
import AuthenticationLayout from '@/layouts/AuthenticationLayout.vue';
// import FormSignUpOrganiser from '@/components/Forms/FormSignUpOrganiser.vue';
import FormSignUpSponsor from '@/components/Forms/FormSignUpSponsor.vue';

import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'SignUp',
  components: {
    AuthenticationLayout,
    // FormSignUpOrganiser,
    FormSignUpSponsor,
  },
});
</script>
