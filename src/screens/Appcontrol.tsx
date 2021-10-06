import * as React from "react";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Appearance, View, ActivityIndicator } from "react-native";
import AuthFlow from "./AuthFlow";
import MainFlow from "./MainFlow";
import Firebase from "../config/firebase";
import {
  NavigationContainer,
  DefaultTheme,
  // DarkTheme,
} from "@react-navigation/native";
import { AuthenticatedUserContext } from "../Context/AuthenticatedUserProvider";

// const Stack = createNativeStackNavigator();
const auth = Firebase.auth();

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
  const { user, setUser }: any = React.useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(
      async (authenticatedUser: any) => {
        try {
          await (authenticatedUser
            ? setUser(authenticatedUser)
            : setUser(null));
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    );
    return unsubscribeAuth;
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? BlackTheme : LightTheme}
    >
      {user ? <MainFlow /> : <AuthFlow />}
    </NavigationContainer>
  );
}

export default App;
// <Stack.Navigator
//   screenOptions={{
//     headerShown: false,
//   }}
// >
//   <Stack.Screen name="Auth" component={AuthFlow} />
// </Stack.Navigator>
