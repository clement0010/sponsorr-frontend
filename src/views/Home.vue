<template>
  <v-container class="pa-0" fluid>
    <NavigationBarWeb />
    <HomeFrame1 />
    <HomeFrame2 />
    <HomeFrame3 />
    <HomeFrame4 />
    <HomeFooter />
  </v-container>
</template>

<script>
import NavigationBarWeb from '@/components/navigation/NavigationBarWeb.vue';
import HomeFrame1 from '@/components/frames/HomeFrame1.vue';
import HomeFrame2 from '@/components/frames/HomeFrame2.vue';
import HomeFrame3 from '@/components/frames/HomeFrame3.vue';
import HomeFrame4 from '@/components/frames/HomeFrame4.vue';
import HomeFooter from '@/components/footers/HomeFooter.vue';

export default {
  components: {
    NavigationBarWeb,
    HomeFrame1,
    HomeFrame2,
    HomeFrame3,
    HomeFrame4,
    HomeFooter,
  },
};
</script>
