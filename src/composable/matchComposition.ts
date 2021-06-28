import { ref } from '@vue/composition-api';

import {
  getAllMatchedEventFromDb,
  parseUserEventId,
  updateMatchedEventStatusFromDb,
} from '@/common';
import { pendingCategory, rejectedCategory, acceptedCategory } from '@/common/matchesConfig';
import { Match, MatchCategory, MatchStatus, Message } from '@/types';
import { MatchGroup } from '@/types/enum';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useMatch() {
  const loading = ref(true);

  const matchCategories = ref<MatchCategory[]>([
    pendingCategory,
    rejectedCategory,
    acceptedCategory,
  ]);

  const initialise = async (uid: string): Promise<void> => {
    try {
      loading.value = true;
      // uid is sponsor id
      pendingCategory.contents = await getAllMatchedEventFromDb(uid, MatchGroup.Pending);

      pendingCategory.loaded = true;
    } catch (err) {
      console.error(err);
      throw new Error(err);
    } finally {
      loading.value = false;
    }
  };

  const fetchMatches = async (uid: string, matchCategory: MatchCategory): Promise<void> => {
    try {
      if (!matchCategory.loaded) {
        loading.value = true;
        const matchRef = matchCategory;

        matchRef.contents = await getAllMatchedEventFromDb(uid, matchRef.name);

        matchRef.loaded = true;
      }
    } catch (err) {
      console.error(err);
      throw new Error(err);
    } finally {
      loading.value = false;
    }
  };

  const updateMatchStatus = async (
    eventItem: Match,
    matchCategory: MatchStatus,
    message?: Message,
  ): Promise<void> => {
    const { eventId, userId } = eventItem;
    const userEventId = parseUserEventId(userId, eventId);
    try {
      await updateMatchedEventStatusFromDb(userEventId, matchCategory, message);
    } catch (err) {
      console.error(err);
      throw new Error(err);
    } finally {
      pendingCategory.contents = pendingCategory.contents.filter(
        (event) => event.eventId !== eventId,
      );
      switch (matchCategory) {
        case MatchGroup.Accepted:
          acceptedCategory.contents.push(eventItem);
          break;
        case MatchGroup.Rejected:
          rejectedCategory.contents.push(eventItem);
          break;

        default:
          break;
      }
      loading.value = false;
    }
  };

  return {
    loading,
    matchCategories,

    initialise,
    fetchMatches,
    updateMatchStatus,
  };
}
