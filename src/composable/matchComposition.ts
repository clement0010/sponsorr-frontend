import { ref, onMounted, computed } from '@vue/composition-api';

import {
  changeUserMatchStatusFromDb,
  getAllMatchedEventFromDb,
  getMatchesByEventId,
  parseUserEventId,
  updateMatchedEventStatusFromDb,
} from '@/common';
import { pendingCategory, rejectedCategory, acceptedCategory } from '@/common/matchesConfig';
import { Match, MatchCategory, Matches, MatchStatus, Message, Role, SponsorEvent } from '@/types';
import { MatchGroup } from '@/types/enum';
import { uid, role } from '@/composable/store';
import useSnackbar from './snackbarComposition';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useMatch() {
  const { success, alert } = useSnackbar();

  const loading = ref(true);
  const error = ref(false);

  const storedRole = ref<Role>();
  const id = ref<string>('');

  const matches = ref<Matches>();

  const matchCategories = ref<MatchCategory[]>([
    pendingCategory,
    rejectedCategory,
    acceptedCategory,
  ]);

  const initialise = async (): Promise<void> => {
    try {
      loading.value = true;
      // uid is sponsor id
      console.log(uid);

      if (!role.value) return;

      pendingCategory.contents = await getAllMatchedEventFromDb(
        uid.value,
        role.value,
        MatchGroup.Pending,
      );

      pendingCategory.loaded = true;
    } catch (err) {
      console.error(err);
      throw new Error(err);
    } finally {
      loading.value = false;
    }
  };

  onMounted(async () => {
    await initialise();
  });

  const fetchMatches = async (matchCategory: MatchCategory): Promise<void> => {
    try {
      if (!matchCategory.loaded) {
        loading.value = true;
        const matchRef = matchCategory;

        matchRef.contents = await getAllMatchedEventFromDb(
          id.value,
          storedRole.value,
          matchRef.name,
        );

        matchRef.loaded = true;
      }
    } catch (err) {
      console.error(err);
      throw new Error(err);
    } finally {
      loading.value = false;
    }
  };

  const fetchMatchesByEventId = async (eventId: string, userEvent: SponsorEvent | undefined) => {
    try {
      error.value = false;
      loading.value = true;
      const eventMatches = await getMatchesByEventId(eventId, userEvent);
      matches.value = eventMatches;
    } catch (err) {
      error.value = true;
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

  const updateUserMatchStatus = async (
    eventId: string,
    userId: string,
    status: MatchStatus,
    userRole: Role | undefined,
  ) => {
    try {
      await changeUserMatchStatusFromDb(eventId, userId, status, userRole);
      if (status === 'accepted') {
        success('Match accepted!');
      }
      if (status === 'rejected') {
        success('Match rejected');
      }
    } catch (err) {
      alert('There was an issue');
    }
  };

  return {
    initialise,
    fetchMatches,
    fetchMatchesByEventId,
    updateMatchStatus,
    updateUserMatchStatus,

    loading: computed(() => loading.value),
    error: computed(() => error.value),

    matches: computed(() => matches.value),

    matchCategories,
  };
}
