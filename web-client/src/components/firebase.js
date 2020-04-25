import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/analytics';
const firebaseConfig = {
  apiKey: "AIzaSyA10d1yG7SomBpiEWMQ4hdpwXKbDaCzLgY",
  authDomain: "corona-personal-trainer.firebaseapp.com",
  databaseURL: "https://corona-personal-trainer.firebaseio.com",
  projectId: "corona-personal-trainer",
  storageBucket: "corona-personal-trainer.appspot.com",
  messagingSenderId: "604190855423",
  appId: "1:604190855423:web:164d799f380bc622cfbcca",
  measurementId: "G-17SQLVK68B"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();
export default firebase
