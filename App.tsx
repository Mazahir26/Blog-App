import { StatusBar } from "expo-status-bar";
import React from "react";
import AppControl from "./src/screens/Appcontrol";
import { AuthenticatedUserProvider } from "./src/Context/AuthenticatedUserProvider";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <AuthenticatedUserProvider>
        <AppControl />
      </AuthenticatedUserProvider>
    </>
  );
}
