import { NavigationGuardNext, Route } from 'vue-router';
import { authenticated, authLoading, uid } from '@/composable/store';
import { watch } from '@vue/composition-api';

const unAuthGuard = (to: Route, from: Route, next: NavigationGuardNext): void => {
  const redirect = () => {
    if (authLoading.value) return;

    if (!to.matched.some((record) => record.meta.requiresAuth)) {
      if (authenticated.value) {
        const id = uid.value;
        return next({
          name: 'Profile',
          params: {
            id,
          },
        });
      }
      return next();
    }
    return next();
  };

  watch(authLoading, () => redirect());

  return redirect();
};

export default unAuthGuard;
