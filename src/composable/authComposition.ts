import Vue from 'vue';

import useProfile from '@/composable/profileComposition';
import useSnackbar from '@/composable/snackbarComposition';

import { authenticated, authLoading, uid, userInfo } from '@/composable/store';
import { auth } from '@/common/firebase';
import { EventOrganiser, Sponsor } from '@/types';
import { createUserProfileToDb } from '@/common/firestore/profile';

import { ref, computed } from '@vue/composition-api';

const { fetchUserProfile } = useProfile();

auth.onAuthStateChanged(async (user) => {
  try {
    authLoading.value = true;
    if (!user) {
      authenticated.value = false;
      console.log('Im logged out!');
      return;
    }
    userInfo.value = user;
    uid.value = user.uid;
    Vue.prototype.$uid = uid.value;
    await fetchUserProfile(uid.value);
    console.log('Auth State:', user);
    authenticated.value = true;
  } catch (err) {
    console.error(err);
  } finally {
    authLoading.value = false;
  }
});

// eslint-disable-next-line
export default function useAuth() {
  const { alert, success } = useSnackbar();

  const error = ref(false);

  const signout = async () => {
    authLoading.value = true;
    auth
      .signOut()
      .then(() => {
        authLoading.value = false;
        authenticated.value = false;
        uid.value = '';
        userInfo.value = undefined;
      })
      .catch((err) => {
        console.error(err);
        error.value = true;
      });
    success('Signed out!');
  };

  const login = async (email: string, password: string): Promise<string | undefined> => {
    try {
      authLoading.value = true;
      const { user } = await auth.signInWithEmailAndPassword(email, password);

      authenticated.value = true;
      authLoading.value = false;
      error.value = false;

      if (!user) {
        console.log('Login Error');
      }
      success('Logged in!');
      return user?.uid;
    } catch (err) {
      console.error(err);
      error.value = true;
      authenticated.value = false;
      authLoading.value = false;
      alert('Login error');
      return err;
    }
  };

  const signup = async (
    email: string,
    password: string,
    userMetadata: EventOrganiser | Sponsor,
  ) => {
    try {
      const result = await auth.createUserWithEmailAndPassword(email, password);

      // Guard clause
      if (!result.user) {
        throw new Error('Sign up failed.');
      }

      await createUserProfileToDb(result.user.uid, userMetadata);

      authenticated.value = true;
      authLoading.value = false;
      error.value = false;
      return result.user.uid;
    } catch (err) {
      console.error(err);
      error.value = true;
      authenticated.value = false;
      authLoading.value = false;
      throw err;
    }
  };

  return {
    error: computed(() => error.value),
    userInfo: computed(() => userInfo.value),
    uid: computed(() => uid.value),

    signup,
    signout,
    login,
  };
}
