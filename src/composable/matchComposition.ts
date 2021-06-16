import { pendingCategory, rejectedCategory, acceptedCategory } from '@/common/matchesConfig';
import { MatchCategory } from '@/types';
import { ref } from '@vue/composition-api';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useMatch() {
  const loading = ref(true);

  const matchCategories = ref<MatchCategory[]>();

  const initialise = async (): Promise<void> => {
    try {
      loading.value = true;
      matchCategories.value = [pendingCategory, rejectedCategory, acceptedCategory];
      pendingCategory.loaded = true;
    } catch (err) {
      console.error(err);
      throw new Error(err);
    } finally {
      loading.value = false;
    }
  };

  const fetchMatches = async (matchCategory: MatchCategory): Promise<void> => {
    try {
      if (!matchCategory.loaded) {
        loading.value = true;
        const matchRef = matchCategory;

        // Firebase call

        matchRef.loaded = true;
      }
    } catch (err) {
      console.error(err);
      throw new Error(err);
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    matchCategories,
    initialise,
    fetchMatches,
  };
}
