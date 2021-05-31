import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';




// onAuthStateChangeListener

export const AuthStateChange = (callback: any) => {
  const subscriber = firebase.auth().onAuthStateChanged(callback);
  return subscriber;
};

export const LogoutUser = () => {
  return firebase.auth().signOut().then(() => localStorage.clear());
};
