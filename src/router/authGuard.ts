import useAuth from '@/composable/authComposition';
import { NavigationGuardNext, Route } from 'vue-router';
import { watch } from '@vue/composition-api';
import useProfile from '@/composable/profileComposition';

const authGuard = (to: Route, from: Route, next: NavigationGuardNext): void => {
  const { authenticated, loading, userInfo } = useAuth();
  const { role } = useProfile();

  const redirect = async () => {
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
      if (!authorize.includes(role.value)) {
        // role not authorised so redirect to home page
        return next({ path: '/' });
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
