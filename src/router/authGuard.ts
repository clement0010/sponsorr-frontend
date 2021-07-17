import { NavigationGuardNext, Route } from 'vue-router';
import { watch } from '@vue/composition-api';
import useProfile from '@/composable/profileComposition';
import { authenticated, authLoading, uid } from '@/composable/store';
import useSnackbar from '@/composable/snackbarComposition';

const authGuard = (to: Route, from: Route, next: NavigationGuardNext): void => {
  const { role } = useProfile();
  const { alert } = useSnackbar();

  const redirect = () => {
    if (authLoading.value) return;

    if (to.meta.requiresAuth) {
      if (!authenticated.value) {
        alert('You are not logged in!');
        return next({
          path: '/login',
        });
      }
      const { authorize } = to.meta;

      if (!authorize) {
        return next();
      }

      console.log('I am Role: ', role.value, authorize);
      if (!authorize.includes(role.value)) {
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
  watch(authLoading, () => {
    redirect();
  });

  return redirect();
};

export default authGuard;
