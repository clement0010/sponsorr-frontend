import { EventCategory, SponsorEvent } from '@/types/index';
import { computed, ref } from '@vue/composition-api';
import database from './mockFirestore';

// eslint-disable-next-line
export default function useEvent() {
  const { fetchUpcomingEvents, fetchPastEvents, fetchDrafts, removeEvent } = database();
  const loading = ref(true);

  const eventCategories = ref<EventCategory[]>();

  const upcomingCategory: EventCategory = {
    name: 'Upcoming Events',
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
      },
      {
        text: 'Clicks',
        value: 'clicks',
      },
      {
        text: 'Matches',
        value: 'matches',
      },
      {
        text: 'Actions',
        value: 'actions',
        sortable: false,
      },
    ],
    contents: [],
    fallback: 'No upcoming events',
  };

  const pastCategory: EventCategory = {
    name: 'Past Events',
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
      },
    ],
    contents: [],
    fallback: 'No past events',
  };

  const draftsCategory: EventCategory = {
    name: 'Drafts',
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
      },
    ],
    contents: [],
    fallback: 'Nothing in drafts',
  };

  const initialise = async () => {
    eventCategories.value = [];
    eventCategories.value.push(upcomingCategory);
    eventCategories.value.push(pastCategory);
    eventCategories.value.push(draftsCategory);
    loading.value = true;
    await fetchUpcomingEvents().then((upcoming) => {
      upcomingCategory.contents = upcoming;
      upcomingCategory.loaded = true;
    });
    loading.value = false;
  };

  const fetchEvents = async (eventCategory: EventCategory) => {
    if (!eventCategory.loaded) {
      loading.value = true;
      const categoryRef = eventCategory;
      switch (eventCategory.name) {
        case 'Upcoming Events':
          categoryRef.contents = await fetchUpcomingEvents();
          break;
        case 'Past Events':
          categoryRef.contents = await fetchPastEvents();
          break;
        default:
          categoryRef.contents = await fetchDrafts();
          break;
      }
      categoryRef.loaded = true;
      loading.value = false;
    }
  };

  const deleteEvent = async (event: SponsorEvent, eventCategory: EventCategory) => {
    await removeEvent(event);
    eventCategory.contents.splice(eventCategory.contents.indexOf(event), 1);
  };

  return {
    eventCategories: computed(() => eventCategories.value),
    loading,
    initialise,
    fetchEvents,
    deleteEvent,
  };
}
