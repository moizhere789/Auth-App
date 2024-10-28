// // firebase.config.js
// import { initializeApp, getApp, getApps } from 'firebase/app';
// import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyDDC6-s1FbLtQHNpBQE36IksZtXtsdLf2Y",
//   authDomain: "auth-app-a2613.firebaseapp.com",
//   projectId: "auth-app-a2613",
//   storageBucket: "auth-app-a2613.appspot.com",
//   messagingSenderId: "234221147621",
//   appId: "1:234221147621:web:c5d4739b77d83d66c30b0c"
// };

// let app;
// let auth;
// let firestore;

// if (!getApps().length) {
//   app = initializeApp(firebaseConfig);
//   auth = initializeAuth(app, {
//     persistence: getReactNativePersistence(ReactNativeAsyncStorage),
//   });
//   firestore =getFirestore(app)
// } else {
//   app = getApp();
//   auth = getAuth(app);
//   firestore =getFirestore(app)
// }

// export { auth, app, firestore };

// firebase.config.js
// firebase.config.js
import { initializeApp, getApp, getApps } from 'firebase/app';
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // Import Firebase Storage

const firebaseConfig = {
  apiKey: "AIzaSyDDC6-s1FbLtQHNpBQE36IksZtXtsdLf2Y",
  authDomain: "auth-app-a2613.firebaseapp.com",
  projectId: "auth-app-a2613",
  storageBucket: "auth-app-a2613.appspot.com",
  messagingSenderId: "234221147621",
  appId: "1:234221147621:web:c5d4739b77d83d66c30b0c"
};

let app;
let auth;
let firestore;
let storage; // Declare storage variable

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
  firestore = getFirestore(app);
  storage = getStorage(app); // Initialize Firebase Storage
} else {
  app = getApp();
  auth = getAuth(app);
  firestore = getFirestore(app);
  storage = getStorage(app); // Ensure storage is initialized
}

export { auth, app, firestore, storage }; // Export storage
