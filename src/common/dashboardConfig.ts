import { EventCategory } from '@/types';
import { EventGroup } from '@/types/enum';

export const upcomingCategory: EventCategory = {
  name: EventGroup.Upcoming,
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
  fallback: 'No upcoming events',
};

export const pastCategory: EventCategory = {
  name: EventGroup.Past,
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
  fallback: 'No past events',
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
