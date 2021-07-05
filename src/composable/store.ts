import Vue from 'vue';
import VueComposistionApi, { ref } from '@vue/composition-api';

import { FirebaseUser, Profile, Role } from '@/types';

Vue.use(VueComposistionApi);

export const userProfile = ref<Profile>();
export const role = ref<Role>();

// Authentication
export const authLoading = ref(true);
export const authenticated = ref(false);

export const uid = ref('');
export const userInfo = ref<FirebaseUser>();
