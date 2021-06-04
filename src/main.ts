import VueTelInputVuetify from 'vue-tel-input-vuetify/lib';
import VueCompositionApi from '@vue/composition-api';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;
Vue.use(VueCompositionApi);
Vue.use(VueTelInputVuetify, { vuetify });

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
