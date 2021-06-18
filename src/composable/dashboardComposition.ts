import { EventCategory, EventStatus, SponsorEvent, SponsorEventDbItem } from '@/types/index';
import { computed, ref } from '@vue/composition-api';
import { createEventToDb, getUserEventByStatusFromDb } from '@/common/firestore/dashboard';
import { draftsCategory, matchedCategory, publishedCategory } from '@/common/dashboardConfig';
import { EventGroup } from '@/types/enum';

// eslint-disable-next-line
export default function useDashboard() {
  const loading = ref(true);

  const eventCategories = ref<EventCategory[]>();

  const initialise = async (): Promise<void> => {
    try {
      loading.value = true;
      eventCategories.value = [publishedCategory, matchedCategory, draftsCategory];

      // Todo: Integrate UID
      publishedCategory.contents = await getUserEventByStatusFromDb(
        'M2vz9kjWxZZfRe3eBocZ3ktSYcX2',
        EventGroup.Published,
      );

      publishedCategory.loaded = true;
    } catch (err) {
      console.error(err);
      throw new Error(err);
    } finally {
      loading.value = false;
    }
  };

  const fetchEvents = async (eventCategory: EventCategory): Promise<void> => {
    try {
      if (!eventCategory.loaded) {
        loading.value = true;
        const categoryRef = eventCategory;

        // Todo: Integrate UID
        categoryRef.contents = await getUserEventByStatusFromDb(
          'M2vz9kjWxZZfRe3eBocZ3ktSYcX2',
          eventCategory.name,
        );

        categoryRef.loaded = true;
      }
    } catch (err) {
      console.error(err);
      throw new Error(err);
    } finally {
      loading.value = false;
    }
  };

  const deleteEvent = async (eventId: string, eventStatus: EventStatus): Promise<void> => {
    try {
      loading.value = true;
      // call to firebase
      switch (eventStatus) {
        case EventGroup.Matched:
          matchedCategory.contents = matchedCategory.contents.filter(
            (event) => event.eventId !== eventId,
          );
          break;

        case EventGroup.Draft:
          draftsCategory.contents = matchedCategory.contents.filter(
            (event) => event.eventId !== eventId,
          );
          break;

        case EventGroup.Published:
          publishedCategory.contents = matchedCategory.contents.filter(
            (event) => event.eventId !== eventId,
          );
          break;
        default:
          break;
      }
    } catch (err) {
      console.error(err);
      throw new Error(err);
    } finally {
      loading.value = false;
    }
  };

  const publishEvent = async (eventItem: SponsorEventDbItem): Promise<void> => {
    try {
      loading.value = true;
      // call to firebase
      const { eventId } = eventItem;
      draftsCategory.contents = draftsCategory.contents.filter(
        (event) => event.eventId !== eventId,
      );
      publishedCategory.contents.push(eventItem);
    } catch (err) {
      console.error(err);
      throw new Error(err);
    } finally {
      loading.value = false;
    }
  };

  const unpublishEvent = async (eventItem: SponsorEventDbItem): Promise<void> => {
    try {
      loading.value = true;
      // call to firebase
      const { eventId } = eventItem;
      publishedCategory.contents = publishedCategory.contents.filter(
        (event) => event.eventId !== eventId,
      );
      draftsCategory.contents.push(eventItem);
    } catch (err) {
      console.error(err);
      throw new Error(err);
    } finally {
      loading.value = false;
    }
  };

  const createEvent = async (event: SponsorEvent): Promise<void> => {
    try {
      loading.value = true;
      createEventToDb('M2vz9kjWxZZfRe3eBocZ3ktSYcX2', event);
    } catch (err) {
      console.error(err);
      throw new Error(err);
    } finally {
      loading.value = false;
    }
  };

  return {
    eventCategories: computed(() => eventCategories.value),
    loading,
    initialise,
    fetchEvents,
    deleteEvent,
    publishEvent,
    unpublishEvent,
    createEvent,
  };
}
