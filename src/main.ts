import VueTelInputVuetify from 'vue-tel-input-vuetify/lib';
import { Chart, registerables } from 'chart.js';
import VueCompositionApi from '@vue/composition-api';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import ScrollAnimation from './directives/scrollAnimation';

Chart.register(...registerables);
Vue.config.productionTip = false;
Vue.use(VueCompositionApi);
Vue.use(VueTelInputVuetify, { vuetify });
Vue.directive('scroll-animation', ScrollAnimation);

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
