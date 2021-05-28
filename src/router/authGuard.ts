import useAuth from '@/composable/authComposition';
import { NavigationGuardNext, Route } from 'vue-router';
import { watch } from '@vue/composition-api';

const authGuard = (from: Route, next: NavigationGuardNext): void => {
  const { authenticated, loading } = useAuth();

  const redirect = () => {
    if (!authenticated.value
      && (from.fullPath === '/event-organiser/login'
      || from.fullPath === '/sponsor/login'
      || from.fullPath === '/sponsor/signup'
      || from.fullPath === '/event-organiser/signup'
      )) {
      return next({
        path: from.fullPath,
      });
    }

    if (!authenticated.value) {
      return next({
        path: '/',
      });
    }

    return next();
  };

  watch(loading, () => redirect());
};

export default authGuard;
