import { MatchCategory } from '@/types';
import { MatchGroup } from '@/types/enum';

export const pendingCategory: MatchCategory = {
  name: MatchGroup.Pending,
  loaded: false,
  headers: [
    {
      text: 'Event',
      value: 'event.title',
    },
    {
      text: 'Date',
      value: 'event.date',
    },
    {
      text: 'Venue',
      value: 'event.venue',
    },
    {
      text: 'Actions',
      value: 'actions',
      sortable: false,
      align: 'center',
    },
  ],
  contents: [],
  fallback: 'No pending matches to review',
};

export const acceptedCategory: MatchCategory = {
  name: MatchGroup.Accepted,
  loaded: false,
  headers: [
    {
      text: 'Event',
      value: 'event.title',
    },
    {
      text: 'Date',
      value: 'event.date',
    },
    {
      text: 'Venue',
      value: 'event.venue',
    },
  ],
  contents: [],
  fallback: 'No accepted matches',
};

export const rejectedCategory: MatchCategory = {
  name: MatchGroup.Rejected,
  loaded: false,
  headers: [
    {
      text: 'Event',
      value: 'event.title',
    },
    {
      text: 'Date',
      value: 'event.date',
    },
    {
      text: 'Venue',
      value: 'event.venue',
    },
  ],
  contents: [],
  fallback: 'No rejected matches',
};
