import useAuth from '@/composable/authComposition';
import { NavigationGuardNext, Route } from 'vue-router';
import { watch } from '@vue/composition-api';

const authGuard = (to: Route, from: Route, next: NavigationGuardNext): void => {
  const { authenticated, loading, userInfo } = useAuth();

  const redirect = () => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (!authenticated.value) {
        return next({
          path: '/',
        });
      }

      return next();
    }

    // Redirect user if they have logged in
    if (authenticated.value) {
      const id = userInfo.value?.uid;
      if (!id) {
        return next({
          path: '/',
        });
      }
      return next({
        name: 'Profile',
        params: {
          id,
        },
      });
    }

    return next();
  };
  watch(loading, () => redirect());

  return next();
};

export default authGuard;
