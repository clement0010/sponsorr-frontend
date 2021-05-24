import useAuth from '@/composable/authComposition';
import { NavigationGuardNext } from 'vue-router';
import { watch } from '@vue/composition-api';

const authGuard = (next: NavigationGuardNext): void => {
  const { authenticated, loading } = useAuth();

  const redirect = () => {
    if (!authenticated.value) {
      return next({
        path: '/event-organiser/login',
      });
    }
    return next();
  };

  watch(loading, () => redirect());
};

export default authGuard;
