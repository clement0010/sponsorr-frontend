import { EventCategory } from '@/types';
import { EventGroup } from '@/types/enum';

export const publishedCategory: EventCategory = {
  name: EventGroup.Published,
  loaded: false,
  headers: [
    {
      text: 'Event Title',
      value: 'title',
    },
    {
      text: 'Date',
      value: 'date',
    },
    {
      text: 'Venue',
      value: 'venue',
    },
    {
      text: 'Views',
      value: 'views',
      align: 'center',
    },
    {
      text: 'Clicks',
      value: 'clicks',
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
  headers: [
    {
      text: 'Event Title',
      value: 'title',
    },
    {
      text: 'Date',
      value: 'date',
    },
    {
      text: 'Venue',
      value: 'venue',
    },
    {
      text: 'Actions',
      value: 'actions',
      sortable: false,
      align: 'center',
    },
  ],
  contents: [],
  fallback: 'Nothing in drafts',
};

export const matchedCategory: EventCategory = {
  name: EventGroup.Matched,
  loaded: false,
  headers: [
    {
      text: 'Event Title',
      value: 'title',
    },
    {
      text: 'Date',
      value: 'date',
    },
    {
      text: 'Venue',
      value: 'venue',
    },
    {
      text: 'Views',
      value: 'views',
      align: 'center',
    },
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
  fallback: 'No events with matches',
};
