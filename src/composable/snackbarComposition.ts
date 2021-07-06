import { snackbarActivate, snackbarMessage, snackbarStatus } from '@/composable/store';
import { computed } from '@vue/composition-api';

// eslint-disable-next-line
export default function useSnackbar() {
  const snackbarShow = () => {
    snackbarActivate.value = true;
    setTimeout(() => {
      snackbarActivate.value = false;
    }, 2000);
  };

  const alert = (message: string): void => {
    snackbarMessage.value = message;
    snackbarStatus.value = 'error';
    snackbarShow();
  };

  const success = (message: string): void => {
    snackbarMessage.value = message;
    snackbarStatus.value = 'success';
    snackbarShow();
  };

  return {
    alert,
    success,

    activate: computed(() => snackbarActivate.value),
    message: computed(() => snackbarMessage.value),
    status: computed(() => snackbarStatus.value),
  };
}
