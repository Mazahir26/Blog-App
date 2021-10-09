import * as React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Feed from "./Feed";
import { AuthenticatedUserContext } from "../Context/AuthenticatedUserProvider";
import MyTabBar from "../components/TabBar";
const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

import { View, Text } from "react-native";

type User = {
  email: string;
  uid: string;
  isAnonymous: boolean;
  displayName: string;
};
interface Context {
  user: User;
  setUser?: any;
}

function TestScreen2() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Test 2 Screen</Text>
    </View>
  );
}
function FeedScreen() {
  return <Feed />;
}

function Tabs() {
  //@ts-ignore
  const { user }: Context = React.useContext(AuthenticatedUserContext);
  return (
    <Tab.Navigator tabBar={(props: any) => <MyTabBar {...props} user={user} />}>
      <Tab.Screen name="Latest" component={FeedScreen} />
      <Tab.Screen name="Saved" component={TestScreen2} />
    </Tab.Navigator>
  );
}

export default function MainFlow() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Tabs}
      />
      <Stack.Screen name="test-1" component={TestScreen2} />
    </Stack.Navigator>
  );
}
