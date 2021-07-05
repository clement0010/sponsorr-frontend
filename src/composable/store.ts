import Vue from 'vue';
import VueComposistionApi, { ref } from '@vue/composition-api';

import { Profile } from '@/types';

Vue.use(VueComposistionApi);

export const userProfile = ref<Profile>();
