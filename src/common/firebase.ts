import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/app-check';

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_MEASUREMENT_ID,
};
const RECAPTCHA_TOKEN = process.env.VUE_APP_RECAPTCHA_VALUE || '';

firebase.initializeApp(firebaseConfig);

const appCheck = firebase.appCheck();
// Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
// key is the counterpart to the secret key you set in the Firebase console.
appCheck.activate(RECAPTCHA_TOKEN);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const firebaseStorage = firebase.storage();
export default firebase;
