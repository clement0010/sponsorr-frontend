import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: 'AIzaSyCF8hR6wTRLHirRGVhzWQJ7-LB9T25SkpI',
  authDomain: 'sponsorr-78463.firebaseapp.com',
  projectId: 'sponsorr-78463',
  storageBucket: 'sponsorr-78463.appspot.com',
  messagingSenderId: '1016952785325',
  appId: '1:1016952785325:web:b18836a08a444a3d143924',
  measurementId: 'G-7HV90KFXEL',
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export default firebase;
