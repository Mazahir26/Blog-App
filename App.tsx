import { StatusBar } from "expo-status-bar";
import React from "react";
import AppControl from "./src/screens/Appcontrol";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <AppControl />
    </>
  );
}
