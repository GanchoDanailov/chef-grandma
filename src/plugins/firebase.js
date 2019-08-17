import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'

if (!firebase.apps.length) {
  const config = {
    apiKey: 'AIzaSyBNWSl8m62o0LmWTqNl4SljjE4OY4ipF9A',
    authDomain: 'chef-grandma-42b73.firebaseapp.com',
    databaseURL: 'https://chef-grandma-42b73.firebaseio.com',
    projectId: 'chef-grandma-42b73',
    storageBucket: '',
    messagingSenderId: '137553232935',
    appId: '1:137553232935:web:4dd760b0c895a49c',
  };
  firebase.initializeApp(config);
  // firebase.firestore().settings({ timestampsInSnapshots: true });
}

export const auth = firebase.auth();
export const DB = firebase.database();
export const StoreDB = firebase.firestore();
export default firebase;
