import { SponsorrEvent } from '@/types/index';
import { ref } from '@vue/composition-api';

// eslint-disable-next-line
export default function useEvent() {
  const loading = ref(false);
  const error = ref(false);

  const createEvent = async (eventMetadata: SponsorrEvent) => {
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

  const myEvents: SponsorrEvent[] = [
    {
      title: 'Fundraising Dinner',
      date: new Date('2021-04-10'),
      venue: 'Teh Tarik Place',
      published: true,
      views: 0,
      clicks: 0,
      matches: 0,
    },
    {
      title: 'Fun Run',
      date: new Date('2021-04-10'),
      venue: 'South Coast Park',
      published: true,
      views: 0,
      clicks: 0,
      matches: 0,
    },
    {
      title: 'Farewell Party',
      date: new Date('2021-04-10'),
      venue: 'The Geck',
      published: true,
      views: 0,
      clicks: 0,
      matches: 0,
    },
    {
      title: 'Cinema Outing',
      date: new Date('2021-04-10'),
      venue: 'Silver City Cinema',
      published: false,
    },
    {
      title: 'Social Action: Caring for the Old',
      date: new Date('2021-04-10'),
      venue: "Old Folks' Home",
      published: false,
    },
    {
      title: 'Some Random Event',
      date: new Date('2021-04-10'),
      venue: 'Batam Island',
      published: false,
    },
    {
      title: 'Filler Event 1',
      date: new Date('2022-04-10'),
      venue: 'Silver City Cinema',
      published: true,
      views: 0,
      clicks: 0,
      matches: 0,
    },
    {
      title: 'Filler Event 2',
      date: new Date('2022-04-10'),
      venue: "Old Folks' Home",
      published: true,
      views: 0,
      clicks: 0,
      matches: 0,
    },
    {
      title: 'Filler Event 3',
      date: new Date('2022-04-10'),
      venue: 'Batam Island',
      published: true,
      views: 0,
      clicks: 0,
      matches: 0,
    },
  ];

  const eventPacket = () => [
    {
      group: 'Upcoming Events',
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
        },
      ],
      content: myEvents.filter((e) => e.published && e.date > new Date()),
      fallback: 'No upcoming events',
    },
    {
      group: 'Past Events',
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
        },
      ],
      content: myEvents.filter((e) => e.published && e.date < new Date()),
      fallback: 'No past events',
    },
    {
      group: 'Drafts',
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
        },
      ],
      content: myEvents.filter((e) => !e.published),
      fallback: 'Nothing in drafts',
    },
  ];

  return {
    createEvent,
    fetchEvent,
    fetchAllEvent,
    publishEvent,
    unpublishEvent,
    editEvent,
    deleteEvent,
    eventPacket,
  };
}
