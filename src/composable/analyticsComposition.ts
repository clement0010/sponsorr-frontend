import { ChartOptions } from 'chart.js';
import { onMounted, ref, computed } from '@vue/composition-api';

import { getAllMatchedEventFromDb } from '@/common/firestore/matches';
import { getUserEventFromDb } from '@/common/firestore/dashboard';
import { SponsorEvents, Role, Matches } from '@/types';
import { summarizeEvents, summarizeMatches } from '@/common';
import { uid, role } from './store';
import useSnackbar from './snackbarComposition';

export const barChartConfig: ChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: role.value === 'EventOrganiser' ? 'Events Summary' : 'Matches Summary',
      font: {
        size: 20,
      },
    },
  },
  scales: {
    y: {
      min: 0,
      ticks: {
        stepSize: 5,
      },
    },
  },
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useAnalytics() {
  const { alert } = useSnackbar();

  const events = ref<SponsorEvents>([]);
  const matches = ref<Matches>([]);
  const barData = ref<number[]>([]);

  const initialise = async (userId: string, userRole: Role | undefined) => {
    try {
      if (userRole === 'EventOrganiser') {
        events.value = await getUserEventFromDb(userId);
        const { clicks, pairs, matches: matchCount } = summarizeEvents(events.value);
        barData.value = [clicks, pairs, matchCount];
      }
      if (userRole === 'Sponsor') {
        matches.value = await getAllMatchedEventFromDb(userId);
        const { accepted, rejected, pending } = summarizeMatches(matches.value);
        barData.value = [pending, accepted, rejected];
      }
    } catch (err) {
      console.error(err);
      alert('There was an issue. Try again later?');
    }
  };
  const barChartData = computed(() =>
    role.value === 'EventOrganiser'
      ? {
          labels: ['Clicks', 'Pairs', 'Matches'],
          datasets: [
            {
              data: barData.value,
              backgroundColor: ['#77CEFF', '#0079AF', '#123E6B'],
            },
          ],
        }
      : {
          labels: ['Pending', 'Accepted', 'Rejected'],
          datasets: [
            {
              data: barData.value,
              backgroundColor: ['#77CEFF', '#0079AF', '#123E6B'],
            },
          ],
        },
  );

  onMounted(async () => {
    await initialise(uid.value, role.value);
  });

  return {
    barChartData,
  };
}
