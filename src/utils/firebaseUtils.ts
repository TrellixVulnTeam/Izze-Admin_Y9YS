import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export const AuthStateChange = (callback: any) => {
  const subscriber = firebase.auth().onAuthStateChanged(callback);
  return subscriber;
};

export const signInWithCredenrials = async (email: string, password: string) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)

};

export const LogoutUser = async () => {
  return firebase.auth().signOut().then(() => localStorage.clear());
};
