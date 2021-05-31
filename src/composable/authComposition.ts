import { ref, computed } from '@vue/composition-api';
import { auth } from '@/common/firebase';
import {
  EventOrganiser, FirebaseUser, Sponsor,
} from '@/types';
import { createUserProfileToDb } from '@/common/firestore/profile';

// eslint-disable-next-line
export default function useAuth() {
  const loading = ref(true);
  const authenticated = ref(false);
  const error = ref(false);
  const userInfo = ref<FirebaseUser>();
  const uid = ref();

  const userAuthState = auth.onAuthStateChanged((user) => {
    loading.value = false;
    if (!user) {
      authenticated.value = false;
      console.log('Im logged out!');
      return;
    }
    userInfo.value = user;
    uid.value = user.uid;
    console.log('Auth State:', user);
    authenticated.value = true;
  });

  const signout = () => {
    loading.value = true;

    auth
      .signOut()
      .then(() => {
        loading.value = false;
        authenticated.value = false;
      })
      .catch((err) => {
        console.error(err);
        error.value = true;
      });
  };

  const login = async (email: string, password: string): Promise<string | undefined> => {
    try {
      loading.value = true;
      const { user } = await auth.signInWithEmailAndPassword(email, password);

      authenticated.value = true;
      loading.value = false;
      error.value = false;

      if (!user) {
        console.log('Login Error');
      }

      return user?.uid;
    } catch (err) {
      console.error(err);
      error.value = true;
      authenticated.value = false;
      loading.value = false;
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
      loading.value = false;
      error.value = false;
      return result.user.uid;
    } catch (err) {
      console.error(err);
      error.value = true;
      authenticated.value = false;
      loading.value = false;
      throw err;
    }
  };

  return {
    loading: computed(() => loading.value),
    authenticated: computed(() => authenticated.value),
    error: computed(() => error.value),
    userInfo: computed(() => userInfo.value),
    uid: computed(() => uid.value),
    userAuthState,
    signup,
    signout,
    login,
  };
}
