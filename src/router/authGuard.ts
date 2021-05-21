import useAuth from '@/composable/authComposition';
import { NavigationGuardNext, Route } from 'vue-router';

const authGuard = (to: Route, from: Route, next: NavigationGuardNext): any => {
  const { authenticated } = useAuth();
  if (authenticated.value) {
    next();
  } else {
    next({
      name: 'Login',
    });
  }
};

export default authGuard;
