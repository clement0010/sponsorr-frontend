import { SponsorrEvent } from '@/types/index';

// eslint-disable-next-line
export default function useEvent() {
  const myEvents: SponsorrEvent[] = [
    {
      title: 'Fundraising Dinner',
      date: new Date('2021-04-10'),
      venue: 'Teh Tarik Place',
      published: true,
    },
    {
      title: 'Fun Run',
      date: new Date('2021-04-10'),
      venue: 'South Coast Park',
      published: true,
    },
    {
      title: 'Farewell Party',
      date: new Date('2021-04-10'),
      venue: 'The Geck',
      published: true,
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
    },
    {
      title: 'Filler Event 2',
      date: new Date('2022-04-10'),
      venue: "Old Folks' Home",
      published: true,
    },
    {
      title: 'Filler Event 3',
      date: new Date('2022-04-10'),
      venue: 'Batam Island',
      published: true,
    },
  ];

  const eventPacket = [
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
      ],
      content: myEvents.filter((event) => event.published && event.date > new Date()),
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
      ],
      content: myEvents.filter((event) => event.published && event.date < new Date()),
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
      content: myEvents.filter((event) => !event.published),
      fallback: 'Nothing in drafts',
    },
  ];

  return {
    eventPacket,
  };
}
