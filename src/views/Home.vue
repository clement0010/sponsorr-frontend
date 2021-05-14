<template>
  <BasePage>
    <HomeLayout>
      <template v-slot:introduction>
        <Introduction />
      </template>
      <template v-slot:howitworks>
        <HowItWorks />
      </template>
      <template v-slot:benefits>
        <Benefits />
      </template>
      <template v-slot:teams>
        <Teams />
      </template>
    </HomeLayout>
  </BasePage>
</template>

<script>
import BasePage from '@/layouts/BasePage.vue';
import HomeLayout from '@/layouts/HomeLayout.vue';

import Introduction from '@/components/PageComponents/Home/Introduction.vue';
import HowItWorks from '@/components/PageComponents/Home/HowItWorks.vue';
import Benefits from '@/components/PageComponents/Home/Benefits.vue';
import Teams from '@/components/PageComponents/Home/Teams.vue';

export default {
  components: {
    BasePage,
    HomeLayout,
    Introduction,
    HowItWorks,
    Benefits,
    Teams,
  },
};
</script>
