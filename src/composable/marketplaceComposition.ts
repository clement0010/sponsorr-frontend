import { Sponsor, SponsorEvent, SponsorEventDbItems } from '@/types';
import { ref } from '@vue/composition-api';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useMarketplace() {
  const loading = ref(false);

  const searchSponsor = async (input: string): Promise<Sponsor[] | undefined> => {
    return [
      {
        name: 'Sample Sponsor',
        about: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic typesetting,
                remaining essentially unchanged. It was popularised in the 1960s with the release of
                Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of Lorem Ipsum`,
        contact: {
          location: 'Singapore',
          websiteUrl: 'https://www.sample.co',
        },
        phoneNumber: '+6512345678',
        role: 'Sponsor',
        keywords: ['sample', 'business'],
        email: 'sponsor@sponsor.co',
        displayPicture:
          'https://media.wired.com/photos/5a5547032b3a7778f5ca06cb/125:94/w_1593,h_1198,c_limit/Doggo-FeatureArt2-104685145.jpg',
      },
      {
        name: 'Sample Sponsor',
        about: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic typesetting,
                remaining essentially unchanged. It was popularised in the 1960s with the release of
                Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of Lorem Ipsum`,
        contact: {
          location: 'Singapore',
          websiteUrl: 'https://www.sample.co',
        },
        phoneNumber: '+6512345678',
        role: 'Sponsor',
        keywords: ['sample', 'business'],
        email: 'sponsor@sponsor.co',
        displayPicture:
          'https://media.wired.com/photos/5a5547032b3a7778f5ca06cb/125:94/w_1593,h_1198,c_limit/Doggo-FeatureArt2-104685145.jpg',
      },
      {
        name: 'Sample Sponsor',
        about: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic typesetting,
                remaining essentially unchanged. It was popularised in the 1960s with the release of
                Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of Lorem Ipsum`,
        contact: {
          location: 'Singapore',
          websiteUrl: 'https://www.sample.co',
        },
        phoneNumber: '+6512345678',
        role: 'Sponsor',
        keywords: ['sample', 'business'],
        email: 'sponsor@sponsor.co',
        displayPicture:
          'https://media.wired.com/photos/5a5547032b3a7778f5ca06cb/125:94/w_1593,h_1198,c_limit/Doggo-FeatureArt2-104685145.jpg',
      },
      {
        name: 'Sample Sponsor',
        about: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic typesetting,
                remaining essentially unchanged. It was popularised in the 1960s with the release of
                Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of Lorem Ipsum`,
        contact: {
          location: 'Singapore',
          websiteUrl: 'https://www.sample.co',
        },
        phoneNumber: '+6512345678',
        role: 'Sponsor',
        keywords: ['sample', 'business'],
        email: 'sponsor@sponsor.co',
        displayPicture:
          'https://media.wired.com/photos/5a5547032b3a7778f5ca06cb/125:94/w_1593,h_1198,c_limit/Doggo-FeatureArt2-104685145.jpg',
      },
    ];
  };

  const searchEvent = async (input: string): Promise<SponsorEventDbItems | undefined> => {
    return [
      {
        title: 'Sample Event',
        description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic typesetting,
                remaining essentially unchanged. It was popularised in the 1960s with the release of
                Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of Lorem Ipsum`,
        budget: {
          maximum: 1000,
          minimum: 500,
        },
        clicks: 0,
        views: 0,
        matches: 0,
        demographic: ['Public'],
        eventSize: 100,
        keywords: ['sample', 'event'],
        date: {
          start: 1624430993,
          end: 1624430993,
        },
        createdAt: 1624430993,
        picture: 'https://content.presspage.com/uploads/2580/1920_erc-11.jpg?10000',
        published: true,
        venue: 'NUS',
        status: 'published',
        userId: 'keyboardsmashdfgbdjghvakjfgkljf',
        documents: '',
        eventId: 'rQiLYThzjuwAUdjzhij8',
      },
      {
        title: 'Sample Event',
        description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic typesetting,
                remaining essentially unchanged. It was popularised in the 1960s with the release of
                Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of Lorem Ipsum`,
        budget: {
          maximum: 1000,
          minimum: 500,
        },
        clicks: 0,
        views: 0,
        matches: 0,
        demographic: ['Public'],
        eventSize: 100,
        keywords: ['sample', 'event'],
        date: {
          start: 1624430993,
          end: 1624430993,
        },
        createdAt: 1624430993,
        picture: 'https://content.presspage.com/uploads/2580/1920_erc-11.jpg?10000',
        published: true,
        venue: 'NUS',
        status: 'published',
        userId: 'keyboardsmashdfgbdjghvakjfgkljf',
        documents: '',
        eventId: 'rQiLYThzjuwAUdjzhij8',
      },
      {
        title: 'Sample Event',
        description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic typesetting,
                remaining essentially unchanged. It was popularised in the 1960s with the release of
                Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of Lorem Ipsum`,
        budget: {
          maximum: 1000,
          minimum: 500,
        },
        clicks: 0,
        views: 0,
        matches: 0,
        demographic: ['Public'],
        eventSize: 100,
        keywords: ['sample', 'event'],
        date: {
          start: 1624430993,
          end: 1624430993,
        },
        createdAt: 1624430993,
        picture: 'https://content.presspage.com/uploads/2580/1920_erc-11.jpg?10000',
        published: true,
        venue: 'NUS',
        status: 'published',
        userId: 'keyboardsmashdfgbdjghvakjfgkljf',
        documents: '',
        eventId: 'rQiLYThzjuwAUdjzhij8',
      },
      {
        title: 'Sample Event',
        description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic typesetting,
                remaining essentially unchanged. It was popularised in the 1960s with the release of
                Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of Lorem Ipsum`,
        budget: {
          maximum: 1000,
          minimum: 500,
        },
        clicks: 0,
        views: 0,
        matches: 0,
        demographic: ['Public'],
        eventSize: 100,
        keywords: ['sample', 'event'],
        date: {
          start: 1624430993,
          end: 1624430993,
        },
        createdAt: 1624430993,
        picture: 'https://content.presspage.com/uploads/2580/1920_erc-11.jpg?10000',
        published: true,
        venue: 'NUS',
        status: 'published',
        userId: 'keyboardsmashdfgbdjghvakjfgkljf',
        documents: '',
        eventId: 'rQiLYThzjuwAUdjzhij8',
      },
    ];
  };

  return {
    loading,
    searchSponsor,
    searchEvent,
  };
}
