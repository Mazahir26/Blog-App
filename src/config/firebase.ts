import firebase from "@firebase/app";
import { firebaseConfig } from "./config";
import "@firebase/auth";
import "@firebase/firestore";

let Firebase: any = null;

if (firebase.apps.length === 0) {
  Firebase = firebase.initializeApp(firebaseConfig);
}

export default Firebase;
