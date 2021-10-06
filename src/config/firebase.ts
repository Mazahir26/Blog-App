import firebase from "@firebase/app";
import "@firebase/auth";
import { firebaseConfig } from "./config";

let Firebase: any = null;

if (firebase.apps.length === 0) {
  Firebase = firebase.initializeApp(firebaseConfig);
}

export default Firebase;
