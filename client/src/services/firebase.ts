import { FIREBASE_WEBCLIENT_ID } from '@env'; // <-- The import!
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: FIREBASE_WEBCLIENT_ID, // from Firebase project settings
});

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  // This is often needed for Google Sign-In on Android
  webClientId: FIREBASE_WEBCLIENT_ID,
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;