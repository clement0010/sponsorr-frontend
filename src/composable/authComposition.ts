import { ref, computed } from '@vue/composition-api';
import { auth, firestore } from '@/services/firebase';

export default function useAuth() {
  const loading = ref(true);
  const authenticated = ref(false);
  const error = ref(false);

  // eslint-disable-next-line
  const userAuthState = auth.onAuthStateChanged(user => {
    loading.value = false;
    if (!user) {
      authenticated.value = false;
      console.log('Im logged out!');
      return;
    }

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
      if (!result) {
        throw new Error('Sign up failed.');
      }

      firestore
        .collection('users')
        // eslint-disable-next-line
        .doc(result.user!.uid)
        .set({
          // eslint-disable-next-line
          uid: result.user!.uid,
          name,
          rooms: [],
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
    userAuthState,
    signup,
    signout,
    login,
  };
}
