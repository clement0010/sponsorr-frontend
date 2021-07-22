import { ref, onMounted, computed } from '@vue/composition-api';

import {
  updateUserMatchStatusFromDb,
  getAllMatchedEventFromDb,
  getMatchesByEventId,
  getMatchesByOrganiserId,
  parseUserEventId,
  updateMatchedEventStatusFromDb,
  sponsorGetMatchOffer,
} from '@/common';
import { pendingCategory, rejectedCategory, acceptedCategory } from '@/common/matchesConfig';
import { Match, MatchCategory, Matches, MatchStatus, Role, SponsorEvent } from '@/types';
import { MatchGroup } from '@/types/enum';
import { uid, role } from '@/composable/store';
import useSnackbar from './snackbarComposition';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useMatch() {
  const { success, alert } = useSnackbar();

  const loading = ref(true);
  const error = ref(false);

  const matches = ref<Matches>([]);

  const matchCategories = ref<MatchCategory[]>([
    pendingCategory,
    acceptedCategory,
    rejectedCategory,
  ]);

  const initialise = async (): Promise<void> => {
    try {
      loading.value = true;
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

        matchRef.contents = await getAllMatchedEventFromDb(uid.value, role.value, matchRef.name);

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

  const fetchMatchOffer = async (eventId: string): Promise<void> => {
    try {
      error.value = false;
      loading.value = true;
      const eventMatches = await sponsorGetMatchOffer(parseUserEventId(uid.value, eventId));

      if (!eventMatches) {
        return;
      }

      matches.value = [eventMatches];
    } catch (err) {
      error.value = true;
    } finally {
      loading.value = false;
    }
  };

  const fetchMatchesByOrganiserId = async (organiserId: string) => {
    try {
      error.value = false;
      loading.value = true;
      const eventMatches = await getMatchesByOrganiserId(organiserId);
      matches.value = eventMatches;
    } catch (err) {
      error.value = true;
    } finally {
      loading.value = false;
    }
  };

  const updateUserMatchStatus = async (
    match: Match,
    status: MatchStatus,
    userRole: Role | undefined,
  ) => {
    try {
      await updateUserMatchStatusFromDb(match.eventId, match.userId, status, userRole);

      const userEventId = parseUserEventId(match.userId, match.eventId);
      if (userRole === 'Sponsor') {
        if (match.organiserStatus === 'accepted' && status === 'accepted') {
          await updateMatchedEventStatusFromDb(userEventId, 'accepted');
          pendingCategory.contents = pendingCategory.contents.filter(
            (event) => event.eventId !== match.eventId,
          );
          acceptedCategory.contents.push(match);
        }
      }
      if (userRole === 'EventOrganiser') {
        if (match.sponsorStatus === 'accepted' && status === 'accepted') {
          await updateMatchedEventStatusFromDb(userEventId, 'accepted');
        }
      }
      if (status === 'accepted') {
        success('Match accepted!');
      }
      if (status === 'rejected') {
        await updateMatchedEventStatusFromDb(userEventId, 'rejected');
        success('Match rejected!');
        pendingCategory.contents = pendingCategory.contents.filter(
          (event) => event.eventId !== match.eventId,
        );
        rejectedCategory.contents.push(match);
      }
      return;
    } catch (err) {
      console.error(err);
      alert('There was an issue');
    }
  };

  return {
    initialise,
    fetchMatches,
    fetchMatchesByEventId,
    fetchMatchesByOrganiserId,
    updateUserMatchStatus,
    fetchMatchOffer,

    loading: computed(() => loading.value),
    error: computed(() => error.value),

    matches: computed(() => matches.value),

    matchCategories: computed(() => matchCategories.value),
  };
}
