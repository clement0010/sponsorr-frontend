import { ref } from '@vue/composition-api';

// eslint-disable-next-line
export default function useSnackbar() {
  const snackbarActivate = ref(false);
  const snackbarMessage = ref('');
  const snackbarStatus = ref('');

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
    snackbarActivate,
    snackbarMessage,
    snackbarStatus,

    snackbarShow,
    alert,
    success,
  };
}
