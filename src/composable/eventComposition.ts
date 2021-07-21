import useSnackbar from '@/composable/snackbarComposition';

import {
  updateEventStatusToDb,
  createEventToDb,
  deleteEventFromDb,
  getEventFromDb,
  updateEventFromDb,
} from '@/common';
import { EventStatus, Messages, SponsorEvent } from '@/types';
import { computed, ref } from '@vue/composition-api';
import { applyEventToDb } from '@/common/firestore/marketplace';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useEvent() {
  const { alert, success } = useSnackbar();

  const loading = ref(true);
  const error = ref(false);

  const event = ref<SponsorEvent>();

  const createEvent = async (newEvent: SponsorEvent): Promise<void> => {
    try {
      loading.value = true;
      success('Creating event...');
      await createEventToDb(newEvent);
      success('Event created successfully!');
    } catch (err) {
      console.error(err);
      alert('Error creating event');
      throw new Error(err);
    } finally {
      loading.value = false;
    }
  };

  const fetchUserEvent = async (eventId: string): Promise<void> => {
    try {
      loading.value = true;
      const userEvent = await getEventFromDb(eventId);
      if (!userEvent) {
        throw new Error('Failed to fetch event');
      }
      event.value = userEvent;
    } catch (err) {
      console.error(err);
      error.value = true;
    } finally {
      loading.value = false;
    }
  };

  const deleteEvent = async (eventId: string) => {
    try {
      loading.value = true;
      await deleteEventFromDb(eventId);
      success('Event deleted');
    } catch (err) {
      console.error(err);
      error.value = true;
      alert('Failed to delete!');
    } finally {
      loading.value = false;
    }
  };

  const updateEventStatus = async (eventId: string, status: EventStatus, published: boolean) => {
    try {
      if (!event.value) {
        console.log('No event to update');
        return;
      }
      loading.value = true;
      await updateEventStatusToDb(eventId, status, published);
      event.value.status = status;
      event.value.published = published;
      if (status === 'published') {
        success('Event published');
        return;
      }
      success('Event unpublished');
    } catch (err) {
      console.error(err);
      error.value = true;
      alert('There was an issue, please retry');
    } finally {
      loading.value = false;
    }
  };

  const editEvent = async (eventID: string, newData: Record<string, unknown>) => {
    try {
      if (!event.value) {
        console.log('No event to edit!');
        return;
      }
      event.value = {
        ...event.value,
        ...newData,
      };
      await updateEventFromDb(eventID, newData);
      success('Successfully edited!');
      return;
    } catch (err) {
      alert('Process failed');
      throw new Error(err);
    }
  };

  const applyEvent = async (
    eventId: string,
    userId: string,
    organiserId: string,
    messages?: Messages,
  ): Promise<void> => {
    try {
      await applyEventToDb(eventId, userId, organiserId, messages);
      success('Application sent!');
    } catch (err) {
      error.value = true;
      alert('Something went wrong!');
    }
  };

  return {
    event: computed(() => event.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),

    createEvent,
    fetchUserEvent,
    updateEventStatus,
    editEvent,
    deleteEvent,
    applyEvent,
  };
}
