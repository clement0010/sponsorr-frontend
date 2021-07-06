import { NavigationGuardNext, Route } from 'vue-router';
import { watch } from '@vue/composition-api';
import useProfile from '@/composable/profileComposition';
import { authenticated, authLoading, uid } from '@/composable/store';

const authGuard = (to: Route, from: Route, next: NavigationGuardNext): void => {
  const { role } = useProfile();

  const redirect = () => {
    if (authLoading.value) return;

    if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (!authenticated.value) {
        return next({
          path: '/',
        });
      }
      const { authorize } = to.meta;

      if (!authorize) {
        return next();
      }

      console.log('I am Role: ', role, authorize);
      if (!authorize.includes(role)) {
        // role not authorised so redirect to home page
        return next({ path: '/' });
      }

      return next();
    }

    // Redirect user if they have logged in
    if (authenticated.value) {
      const id = uid.value;
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
  watch(authLoading, () => redirect());

  return redirect();
};

export default authGuard;
