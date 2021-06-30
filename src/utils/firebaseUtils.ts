import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage'; 

export const AuthStateChange = (callback: any) => {
  const subscriber = firebase.auth().onAuthStateChanged(callback);
  return subscriber;
};

export const onIdTokenChanged = (callback: any) => {
  const subscriber = firebase.auth().onIdTokenChanged(callback);
  return subscriber;
};

export const signInWithCredenrials = async (email: string, password: string) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)

};

export const imageUpload = async (file: any) => {
    return firebase.storage()
    .ref(`images/${file.name}-${new Date().getTime()}`)
    .put(file)
    .then(async (imageResult) => {
      const download_url = await imageResult.ref.getDownloadURL();
      return download_url
    })
}

export const LogoutUser = async () => {
  return firebase.auth().signOut().then(() => localStorage.clear());
};
