import { StatusBar } from "expo-status-bar";
import React from "react";
import AppControl from "./src/screens/Appcontrol";
import { firebase } from "@firebase/app";
import { firebaseConfig } from "./src/config";
firebase.initializeApp(firebaseConfig);
export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <AppControl />
    </>
  );
}
