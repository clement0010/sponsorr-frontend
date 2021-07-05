import { EventCategory, EventStatus, SponsorEventDbItem } from '@/types/index';
import { computed, ref, onMounted } from '@vue/composition-api';
import { getUserEventByStatusFromDb, updateEventStatusToDb } from '@/common/firestore/dashboard';
import { draftsCategory, matchedCategory, publishedCategory } from '@/common/dashboardConfig';
import { EventGroup } from '@/types/enum';
import { deleteEventFromDb } from '@/common';
import { uid } from './store';

// eslint-disable-next-line
export default function useDashboard() {
  const loading = ref(true);

  const eventCategories = ref<EventCategory[]>([
    publishedCategory,
    matchedCategory,
    draftsCategory,
  ]);

  const initialise = async (id: string): Promise<void> => {
    try {
      loading.value = true;

      publishedCategory.contents = await getUserEventByStatusFromDb(id, EventGroup.Published);

      publishedCategory.loaded = true;
    } catch (err) {
      console.error(err);
      throw new Error(err);
    } finally {
      loading.value = false;
    }
  };

  onMounted(async () => {
    await initialise(uid.value);
  });

  const fetchEvents = async (id: string, eventCategory: EventCategory): Promise<void> => {
    try {
      if (!eventCategory.loaded) {
        loading.value = true;
        const categoryRef = eventCategory;

        categoryRef.contents = await getUserEventByStatusFromDb(id, eventCategory.name);

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
      await deleteEventFromDb(eventId);
    } catch (err) {
      console.error(err);
      throw new Error(err);
    } finally {
      console.log(eventStatus);
      switch (eventStatus) {
        case EventGroup.Matched:
          matchedCategory.contents = matchedCategory.contents.filter(
            (event) => event.eventId !== eventId,
          );
          break;

        case EventGroup.Draft:
          draftsCategory.contents = draftsCategory.contents.filter(
            (event) => event.eventId !== eventId,
          );
          break;

        case EventGroup.Published:
          publishedCategory.contents = publishedCategory.contents.filter(
            (event) => event.eventId !== eventId,
          );
          break;
        default:
          break;
      }
      loading.value = false;
    }
  };

  const updateEventStatus = async (
    eventItem: SponsorEventDbItem,
    published: boolean,
  ): Promise<void> => {
    try {
      loading.value = true;
      const { eventId } = eventItem;

      if (published) {
        draftsCategory.contents = draftsCategory.contents.filter(
          (event) => event.eventId !== eventId,
        );
        publishedCategory.contents.push(eventItem);
        await updateEventStatusToDb(eventId, EventGroup.Published, true);
      }

      if (!published) {
        publishedCategory.contents = publishedCategory.contents.filter(
          (event) => event.eventId !== eventId,
        );
        draftsCategory.contents.push(eventItem);
        await updateEventStatusToDb(eventId, EventGroup.Draft, false);
      }
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
    updateEventStatus,
    deleteEvent,
  };
}
