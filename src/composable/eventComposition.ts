import { EventCategory, SponsorEvent } from '@/types/index';
import { computed, ref } from '@vue/composition-api';
import { isPastEvent } from '@/common/utils';
import { getUserEventByStatusFromDb } from '@/common/firestore/dashboard';
import { draftsCategory, pastCategory, upcomingCategory } from '@/common/dashboardConfig';
import { EventGroup } from '@/types/enum';

// eslint-disable-next-line
export default function useEvent() {
  const loading = ref(true);

  const eventCategories = ref<EventCategory[]>();

  const initialise = async (): Promise<void> => {
    try {
      loading.value = true;
      eventCategories.value = [upcomingCategory, pastCategory, draftsCategory];

      // Todo: Integrate UID
      upcomingCategory.contents = await getUserEventByStatusFromDb(
        'M2vz9kjWxZZfRe3eBocZ3ktSYcX2',
        EventGroup.Upcoming,
      );
      upcomingCategory.loaded = true;
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
    eventCategory.contents.splice(eventCategory.contents.indexOf(event), 1);
  };

  const publishEvent = async (event: SponsorEvent) => {
    draftsCategory.contents.splice(draftsCategory.contents.indexOf(event), 1);
    if (isPastEvent(event.date[0])) {
      pastCategory.contents.push(event);
      return;
    }
    upcomingCategory.contents.push(event);
  };

  const unpublishEvent = async (event: SponsorEvent): Promise<void> => {
    if (isPastEvent(event.date[0])) {
      pastCategory.contents.splice(pastCategory.contents.indexOf(event), 1);
    } else {
      upcomingCategory.contents.splice(upcomingCategory.contents.indexOf(event), 1);
    }
    draftsCategory.contents.push(event);
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
