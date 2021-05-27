import firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyBi3UsFLgGnsakPChTBIWYuENEnxIvOELg',
  authDomain: 'izze-dev.firebaseapp.com',
  projectId: 'izze-dev',
  storageBucket: 'izze-dev.appspot.com',
  messagingSenderId: '590965473324',
  appId: '1:590965473324:web:b41d555f6a5d03e7d09189',
  measurementId: 'G-M2QMV10CGL',
};

const firebaseapp = firebase.initializeApp(firebaseConfig);

export default firebaseapp;
