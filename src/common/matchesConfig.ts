import { MatchCategory } from '@/types';
import { MatchGroup } from '@/types/enum';

const baseHeader = [
  {
    text: 'Event',
    value: 'event.title',
    sortable: false,
  },
  {
    text: 'Date',
    value: 'event.date',
    sortable: false,
  },
  {
    text: 'Venue',
    value: 'event.venue',
    sortable: false,
    align: 'center',
  },
];

export const pendingCategory: MatchCategory = {
  name: MatchGroup.Pending,
  loaded: false,
  headers: [
    ...baseHeader,
    {
      text: 'Actions',
      value: 'actions',
      sortable: false,
      align: 'center',
    },
  ],
  contents: [],
  fallback: 'No pending matches to review; apply for an event from the marketplace to get started!',
};

export const acceptedCategory: MatchCategory = {
  name: MatchGroup.Accepted,
  loaded: false,
  headers: [
    ...baseHeader,
    {
      text: 'Actions',
      value: 'actions',
      sortable: false,
      align: 'center',
    },
  ],
  contents: [],
  fallback: 'No accepted matches',
};

export const rejectedCategory: MatchCategory = {
  name: MatchGroup.Rejected,
  loaded: false,
  headers: baseHeader,
  contents: [],
  fallback: 'No rejected matches',
};
