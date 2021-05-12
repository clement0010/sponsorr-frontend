<template>
  <BasePage>
    <FormSignUpOrganiser />
    <FormSignUpSponsor />
  </BasePage>
</template>

<script lang="ts">
import BasePage from '@/layouts/BasePage.vue';
import FormSignUpOrganiser from '@/components/Forms/FormSignUpOrganiser.vue';
import FormSignUpSponsor from '@/components/Forms/FormSignUpSponsor.vue';

export default {
  components: {
    BasePage,
    FormSignUpOrganiser,
    FormSignUpSponsor,
  },
};
</script>
