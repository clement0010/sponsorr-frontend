import Vue from 'vue';
import VueCompositionApi, { ref } from '@vue/composition-api';

import { FirebaseUser, Profile, Role } from '@/types';

Vue.use(VueCompositionApi);

// Profile
export const userProfile = ref<Profile>();
export const role = ref<Role>();

// Authentication
export const authLoading = ref(true);
export const authenticated = ref(false);

export const uid = ref('');
export const userInfo = ref<FirebaseUser>();

// Snackbar
export const snackbarActivate = ref(false);
export const snackbarMessage = ref('');
export const snackbarStatus = ref('');
