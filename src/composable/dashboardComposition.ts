import { EventCategory, SponsorEvent } from '@/types/index';
import { computed, ref } from '@vue/composition-api';
import { getUserEventByStatusFromDb } from '@/common/firestore/dashboard';
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

  const deleteEvent = async (event: SponsorEvent, eventCategory: EventCategory): Promise<void> => {
    try {
      loading.value = true;
      // call to firebase
      eventCategory.contents.splice(eventCategory.contents.indexOf(event), 1);
    } catch (err) {
      console.error(err);
      throw new Error(err);
    } finally {
      loading.value = false;
    }
  };

  const publishEvent = async (event: SponsorEvent): Promise<void> => {
    try {
      loading.value = true;
      // call to firebase
      draftsCategory.contents.splice(draftsCategory.contents.indexOf(event), 1);
      publishedCategory.contents.push(event);
    } catch (err) {
      console.error(err);
      throw new Error(err);
    } finally {
      loading.value = false;
    }
  };

  const unpublishEvent = async (event: SponsorEvent): Promise<void> => {
    try {
      loading.value = true;
      // call to firrebase
      publishedCategory.contents.splice(publishedCategory.contents.indexOf(event), 1);
      draftsCategory.contents.push(event);
    } catch (err) {
      console.error(err);
      throw new Error(err);
    } finally {
      loading.value = false;
    }
  };

  const createEvent = async (event: SponsorEvent): Promise<void> => {
    console.log(event);
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
