import firebase from 'firebase/app';

import { firestore } from '@/common/firebase';
import { Profile } from '@/types';

export const converter = <T>() => ({
  toFirestore: (data: T) => data,
  fromFirestore: (snap: firebase.firestore.QueryDocumentSnapshot) => snap.data() as T,
});

export const dataPoint = <T>(collectionPath: string) => firestore
  .collection(collectionPath)
  .withConverter(converter<T>());

export const db = {
  // list your collections here
  profile: dataPoint<Profile>('users'),
};
