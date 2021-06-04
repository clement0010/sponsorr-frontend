import { generateDateFormat, isPastEvent } from '@/common/utility';
import { SponsorEvent } from '@/types/index';
import { computed, ref } from '@vue/composition-api';

// eslint-disable-next-line
export default function useEvent() {
  const loading = ref(false);
  const error = ref(false);

  const createEvent = async (eventMetadata: SponsorEvent) => {
    try {
      // Call to firebase
    } catch (err) {
      console.error(err);
      error.value = true;
    }
  };

  // For event view, should fetch full metadata
  const fetchEvent = async (eventId: string) => {
    try {
      // Call to firebase
    } catch (err) {
      console.error(err);
      error.value = true;
    }
  };

  // For dashboard view, should fetch essential details only
  const fetchAllEvent = async (uid: string) => {
    try {
      // Call to firebase
    } catch (err) {
      console.error(err);
      error.value = true;
    }
  };

  const publishEvent = async (eventId: string) => {
    try {
      // Call to firebase
    } catch (err) {
      console.error(err);
      error.value = true;
    }
  };

  const unpublishEvent = async (eventId: string) => {
    try {
      // Call to firebase
    } catch (err) {
      console.error(err);
      error.value = true;
    }
  };

  const editEvent = async (eventId: string, newData: Record<string, unknown>) => {
    try {
      // Call to firebase
    } catch (err) {
      console.error(err);
      error.value = true;
    }
  };

  const deleteEvent = async (eventId: string) => {
    try {
      // Call to firebase
    } catch (err) {
      console.error(err);
      error.value = true;
    }
  };

  const events: SponsorEvent[] = [
    {
      title: 'Fundraising Dinner',
      createdAt: generateDateFormat(),
      venue: 'Teh Tarik Place',
      published: true,
      views: 0,
      clicks: 0,
      matches: 0,
    },
    {
      title: 'Fun Run',
      createdAt: generateDateFormat(),
      venue: 'South Coast Park',
      published: true,
      views: 0,
      clicks: 0,
      matches: 0,
    },
    {
      title: 'Farewell Party',
      createdAt: generateDateFormat(),
      venue: 'The Geck',
      published: true,
      views: 0,
      clicks: 0,
      matches: 0,
    },
    {
      title: 'Cinema Outing',
      createdAt: generateDateFormat(),
      venue: 'Silver City Cinema',
      published: false,
      views: 0,
      clicks: 0,
      matches: 0,
    },
    {
      title: 'Social Action: Caring for the Old',
      createdAt: generateDateFormat(),
      venue: "Old Folks' Home",
      published: false,
      views: 0,
      clicks: 0,
      matches: 0,
    },
    {
      title: 'Some Random Event',
      createdAt: generateDateFormat(),
      venue: 'Batam Island',
      published: false,
      views: 0,
      clicks: 0,
      matches: 0,
    },
    {
      title: 'Filler Event 1',
      createdAt: generateDateFormat(),
      venue: 'Silver City Cinema',
      published: true,
      views: 0,
      clicks: 0,
      matches: 0,
    },
    {
      title: 'Filler Event 2',
      createdAt: generateDateFormat(),
      venue: "Old Folks' Home",
      published: true,
      views: 0,
      clicks: 0,
      matches: 0,
    },
    {
      title: 'Filler Event 3',
      createdAt: generateDateFormat(),
      venue: 'Batam Island',
      published: true,
      views: 0,
      clicks: 0,
      matches: 0,
    },
  ];

  // const eventPacket = () => [
  //   {
  //     group: 'Upcoming Events',
  //     headers: [
  //       {
  //         text: 'Event Title',
  //         value: 'title',
  //       },
  //       {
  //         text: 'Date',
  //         value: 'date',
  //       },
  //       {
  //         text: 'Venue',
  //         value: 'venue',
  //       },
  //       {
  //         text: 'Views',
  //         value: 'views',
  //       },
  //       {
  //         text: 'Clicks',
  //         value: 'clicks',
  //       },
  //       {
  //         text: 'Matches',
  //         value: 'matches',
  //       },
  //       {
  //         text: 'Actions',
  //         value: 'actions',
  //       },
  //     ],
  //     content: myEvents.filter((e) => e.published && e.date > new Date()),
  //     fallback: 'No upcoming events',
  //   },
  //   {
  //     group: 'Past Events',
  //     headers: [
  //       {
  //         text: 'Event Title',
  //         value: 'title',
  //       },
  //       {
  //         text: 'Date',
  //         value: 'date',
  //       },
  //       {
  //         text: 'Venue',
  //         value: 'venue',
  //       },
  //       {
  //         text: 'Actions',
  //         value: 'actions',
  //       },
  //     ],
  //     content: myEvents.filter(),
  //     fallback: 'No past events',
  //   },
  //   {
  //     group: 'Drafts',
  //     headers: [
  //       {
  //         text: 'Event Title',
  //         value: 'title',
  //       },
  //       {
  //         text: 'Date',
  //         value: 'date',
  //       },
  //       {
  //         text: 'Venue',
  //         value: 'venue',
  //       },
  //       {
  //         text: 'Actions',
  //         value: 'actions',
  //       },
  //     ],
  //     content: myEvents.filter((e) => !e.published),
  //     fallback: 'Nothing in drafts',
  //   },
  // ];

  return {
    createEvent,
    fetchEvent,
    fetchAllEvent,
    publishEvent,
    unpublishEvent,
    editEvent,
    deleteEvent,

    events,
    filteredEvents: computed(() => events.filter((event) => isPastEvent(event.createdAt))),
  };
}
