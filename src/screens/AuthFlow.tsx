import * as React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Login from "./Login";
import Signup from "./Signup";
import TabBar from "../components/AuthTabBar";
const Tab = createMaterialTopTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator tabBar={(props: any) => <TabBar {...props} />}>
      <Tab.Screen name="Login" component={Login} />
      <Tab.Screen name="SignUp" component={Signup} />
    </Tab.Navigator>
  );
}
