import Vue from 'vue';
import VueComposistionApi, { ref } from '@vue/composition-api';

import { FirebaseUser, Profile } from '@/types';

Vue.use(VueComposistionApi);

export const userProfile = ref<Profile>();

// Authentication
export const authLoading = ref(true);
export const authenticated = ref(false);

export const uid = ref('');
export const userInfo = ref<FirebaseUser>();
