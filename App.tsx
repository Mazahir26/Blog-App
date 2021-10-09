import { StatusBar } from "expo-status-bar";
import React from "react";
import AppControl from "./src/screens/Appcontrol";
import { AuthenticatedUserProvider } from "./src/Context/AuthenticatedUserProvider";
import { Provider } from "./src/Context/SavedFeedContext";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <AuthenticatedUserProvider>
        <Provider>
          <AppControl />
        </Provider>
      </AuthenticatedUserProvider>
    </>
  );
}
