import 'firebase/analytics';
import firebase from 'firebase/app';
import 'firebase/messaging';
import 'firebase/performance';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBi3UsFLgGnsakPChTBIWYuENEnxIvOELg',
  authDomain: 'izze-dev.firebaseapp.com',
  projectId: 'izze-dev',
  storageBucket: 'izze-dev.appspot.com',
  messagingSenderId: '590965473324',
  appId: '1:590965473324:web:b41d555f6a5d03e7d09189',
  measurementId: 'G-M2QMV10CGL',
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

