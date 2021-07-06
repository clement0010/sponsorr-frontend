import useSnackbar from '@/composable/snackbarComposition';

import { computed, ref } from '@vue/composition-api';
import { getUserProfileFromDb, updateUserProfileFromDb } from '@/common/firestore/profile';
import { userProfile, role } from '@/composable/store';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useProfile() {
  const { alert, success } = useSnackbar();

  const loading = ref(false);
  const error = ref(false);

  const fetchUserProfile = async (uid: string) => {
    try {
      loading.value = true;
      userProfile.value = await getUserProfileFromDb(uid);
      if (!userProfile.value) {
        throw new Error('Failed to fetch user profile data');
      }
      role.value = userProfile.value.role;
      error.value = false;
      loading.value = false;
    } catch (err) {
      console.error(err);
      error.value = true;
    }
  };

  const editUserProfile = async (uid: string, newData: Record<string, unknown>) => {
    try {
      if (!userProfile.value) {
        console.log('No profile to edit');
        return;
      }
      userProfile.value = {
        ...userProfile.value,
        ...newData,
      };
      await updateUserProfileFromDb(uid, newData);
      success('Profile edited successfully!');
      return;
    } catch (err) {
      alert('Unable to edit profile');
      throw new Error(err);
    }
  };

  // Sign out only!
  const clearProfile = () => {
    userProfile.value = undefined;
  };

  return {
    fetchUserProfile,
    editUserProfile,
    clearProfile,

    loading: computed(() => loading.value),
    error: computed(() => error.value),

    profile: computed(() => userProfile.value),
    role: computed(() => role.value),
  };
}
