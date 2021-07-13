import { getAllMatchedEventFromDb } from '@/common/firestore/matches';
import { getUserEventFromDb } from '@/common/firestore/dashboard';
import { SponsorEvents, Role, Matches, MatchStatus } from '@/types';
import { onMounted, ref, computed } from '@vue/composition-api';
import { uid, role } from './store';
import useSnackbar from './snackbarComposition';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useAnalytics() {
  const { alert } = useSnackbar();

  const data = ref<number[]>([]);

  const summarizeEvents = (events: SponsorEvents, value: string) => {
    return events
      .map((event) => {
        switch (value) {
          case 'clicks':
            return event.clicks;
          case 'views':
            return event.views;
          case 'matches':
            return event.matches;
          default:
            return 0;
        }
      })
      .reduce((accum, curr) => accum + curr);
  };

  const summarizeMatches = (matches: Matches, value: MatchStatus) => {
    return matches.filter((match) => match.status === value).length;
  };

  const initialise = async (userId: string, userRole: Role | undefined) => {
    try {
      if (userRole === 'EventOrganiser') {
        const events = await getUserEventFromDb(userId);
        data.value.push(summarizeEvents(events, 'clicks'));
        data.value.push(summarizeEvents(events, 'views'));
        data.value.push(summarizeEvents(events, 'matches'));
      }
      if (userRole === 'Sponsor') {
        const matches = await getAllMatchedEventFromDb(userId);
        data.value.push(summarizeMatches(matches, 'accepted'));
        data.value.push(summarizeMatches(matches, 'pending'));
        data.value.push(summarizeMatches(matches, 'rejected'));
      }
    } catch (err) {
      console.error(err);
      alert('There was an issue.');
    }
  };

  onMounted(async () => {
    await initialise(uid.value, role.value);
  });

  return {
    data: computed(() => data.value),
    role: computed(() => role.value),
  };
}
