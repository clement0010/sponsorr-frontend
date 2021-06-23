import { MatchCategory } from '@/types';
import { MatchGroup } from '@/types/enum';

export const pendingCategory: MatchCategory = {
  name: MatchGroup.Pending,
  loaded: false,
  headers: [
    {
      text: 'Event Title',
      value: 'title',
    },
    {
      text: 'Sponsor',
      value: 'sponsorID',
    },
    {
      text: 'Actions',
      value: 'actions',
      sortable: false,
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
      text: 'Event Title',
      value: 'title',
    },
    {
      text: 'Sponsor',
      value: 'sponsorID',
    },
    {
      text: 'Actions',
      value: 'actions',
      sortable: false,
    },
  ],
  contents: [],
  fallback: 'No confirmed matches',
};

export const rejectedCategory: MatchCategory = {
  name: MatchGroup.Rejected,
  loaded: false,
  headers: [
    {
      text: 'Event Title',
      value: 'title',
    },
    {
      text: 'Sponsor',
      value: 'sponsorID',
    },
    {
      text: 'Actions',
      value: 'actions',
      sortable: false,
    },
  ],
  contents: [],
  fallback: 'No rejected matches',
};
