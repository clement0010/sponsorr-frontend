import { getUserProfileFromDb } from '@/common';
import { Profile } from '@/types';
import { computed, ref } from '@vue/composition-api';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useVisitProfile() {
  const loading = ref(true);
  const error = ref(false);

  const visitProfile = ref<Profile>();

  const fetchUserProfile = async (uid: string) => {
    try {
      loading.value = true;
      visitProfile.value = await getUserProfileFromDb(uid);
      if (!visitProfile.value) {
        throw new Error('Failed to fetch user profile data');
      }
      error.value = false;
    } catch (err) {
      console.error(err);
      error.value = true;
    } finally {
      loading.value = false;
    }
  };

  return {
    fetchUserProfile,

    loading: computed(() => loading.value),
    error: computed(() => error.value),

    profile: computed(() => visitProfile.value),
  };
}
