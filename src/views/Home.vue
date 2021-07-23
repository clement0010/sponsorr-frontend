<template>
  <BasePage>
    <HomeLayout>
      <template #introduction>
        <Introduction />
      </template>
      <template #howitworks>
        <HowItWorks />
      </template>
      <template #benefits>
        <Benefits />
      </template>
      <template #teams>
        <CallToAction />
      </template>
    </HomeLayout>
  </BasePage>
</template>

<script lang="ts">
import BasePage from '@/layouts/BasePage.vue';
import Benefits from '@/components/PageComponents/Home/Benefits.vue';
import CallToAction from '@/components/PageComponents/Home/CallToAction.vue';
import HomeLayout from '@/layouts/HomeLayout.vue';
import HowItWorks from '@/components/PageComponents/Home/HowItWorks.vue';
import Introduction from '@/components/PageComponents/Home/Introduction.vue';

import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'Home',
  components: {
    BasePage,
    Benefits,
    CallToAction,
    HomeLayout,
    Introduction,
    HowItWorks,
  },
});
</script>

<style scoped>
.content {
  max-width: 1320px;
}
.fix {
  word-break: normal;
}
</style>
