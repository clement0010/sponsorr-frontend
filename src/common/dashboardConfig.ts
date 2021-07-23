import { EventCategory } from '@/types';
import { EventGroup } from '@/types/enum';

const baseHeader = [
  {
    text: 'Event Title',
    value: 'title',
    sortable: false,
    align: 'center',
  },
  {
    text: 'Date',
    value: 'date',
    sortable: false,
    align: 'center',
  },
  {
    text: 'Venue',
    value: 'venue',
    sortable: false,
    align: 'center',
  },
];

export const publishedCategory: EventCategory = {
  name: EventGroup.Published,
  loaded: false,
  headers: [
    ...baseHeader,
    {
      text: 'Clicks',
      value: 'clicks',
      align: 'center',
    },
    {
      text: 'Matches',
      value: 'matches',
      align: 'center',
    },
    {
      text: 'Actions',
      value: 'actions',
      sortable: false,
      align: 'center',
    },
  ],
  contents: [],
  fallback: 'No published events',
};

export const draftsCategory: EventCategory = {
  name: EventGroup.Draft,
  loaded: false,
  headers: baseHeader,
  contents: [],
  fallback: 'Nothing in drafts',
};

export const matchedCategory: EventCategory = {
  name: EventGroup.Matched,
  loaded: false,
  headers: [
    ...baseHeader,
    {
      text: 'Clicks',
      value: 'clicks',
      align: 'center',
    },
    {
      text: 'Matches',
      value: 'matches',
      align: 'center',
    },
  ],
  contents: [],
  fallback: 'No events with matches',
};
