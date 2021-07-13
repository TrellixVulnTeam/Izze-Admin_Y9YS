import 'firebase/analytics';
import firebase from 'firebase/app';
import 'firebase/messaging';
import 'firebase/performance';
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

declare type FirebaseAppProps = {
  InitializeApp: () => firebase.app.App;
  // InitializeAnalytics: () => firebase.analytics.Analytics | null;
  // InitializePerformance: () => firebase.performance.Performance;
  // InitializeMessaging: () => firebase.messaging.Messaging | null;
};

const FirebaseApp: FirebaseAppProps = {
  InitializeApp: () => firebase.initializeApp(firebaseConfig),
  // InitializeAnalytics: () => {
  //   if (firebase.analytics.isSupported()) return firebase.analytics();
  //   else return null;
  // },

  // InitializePerformance: () => firebase.performance(),

  // InitializeMessaging: () => {
  //   if (firebase.messaging.isSupported()) {
  //     const defaultMessaging = firebase.messaging();
  //     defaultMessaging.usePublicVapidKey((process.env.REACT_APP_WEB_KEY_PAIR as string));
  //     return defaultMessaging;
  //   } else return null;
  // }
};

export default FirebaseApp;
