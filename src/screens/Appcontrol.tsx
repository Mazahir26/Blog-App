import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Appearance } from "react-native";
import Auth from "./Auth";
import {
  NavigationContainer,
  DefaultTheme,
  // DarkTheme,
} from "@react-navigation/native";
const Stack = createNativeStackNavigator();

const LightTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: "#343434",
    background: "#ececec",
    accent: "#343434",
    text: "#343434",
  },
};

const BlackTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: "#343434",
    background: "#ececec",
    accent: "#343434",
    text: "#343434",
  },
};

function App() {
  const colorScheme = Appearance.getColorScheme();
  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? BlackTheme : LightTheme}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Auth" component={Auth} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
