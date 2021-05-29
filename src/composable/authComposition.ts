import { ref, computed } from '@vue/composition-api';
import { auth, firestore } from '@/services/firebase';
import { FirebaseUser } from '@/types';

// eslint-disable-next-line
export default function useAuth() {
  const loading = ref(true);
  const authenticated = ref(false);
  const error = ref(false);
  const userInfo = ref<FirebaseUser>();

  // eslint-disable-next-line
  const userAuthState = auth.onAuthStateChanged(user => {
    loading.value = false;
    if (!user) {
      authenticated.value = false;
      console.log('Im logged out!');
      return;
    }
    userInfo.value = user;
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
      // eslint-disable-next-line
      .catch(err => {
        console.error(err);
        error.value = true;
      });
  };

  const login = async (email: string, password: string) => {
    try {
      loading.value = true;
      // eslint-disable-next-line
      const result = await auth.signInWithEmailAndPassword(email, password);

      console.log('Logged in', result.user);

      authenticated.value = true;
      loading.value = false;
      error.value = false;
    } catch (err) {
      console.error(err);
      error.value = true;
      authenticated.value = false;
      loading.value = false;
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      const result = await auth.createUserWithEmailAndPassword(email, password);

      // Guard clause
      if (!result.user) {
        throw new Error('Sign up failed.');
      }

      firestore
        .collection('users')
        .doc(result.user.uid)
        .set({
          // TODO: Set the correct user attribute
          uid: result.user.uid,
          name,
        });

      authenticated.value = true;
      loading.value = false;
      error.value = false;
    } catch (err) {
      console.error(err);
      error.value = true;
      authenticated.value = false;
      loading.value = false;
    }
  };

  return {
    loading: computed(() => loading.value),
    authenticated: computed(() => authenticated.value),
    error: computed(() => error.value),
    userInfo: computed(() => userInfo.value),
    userAuthState,
    signup,
    signout,
    login,
  };
}
