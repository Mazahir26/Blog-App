import * as React from "react";
import { View, Text } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const Tab = createMaterialTopTabNavigator();

function Login() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>Login</Text>
    </View>
  );
}
function SignUp() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>SingUp</Text>
    </View>
  );
}

export default function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12 },
        tabBarItemStyle: { width: 120 },
        tabBarStyle: { marginTop: 20 },
      }}
    >
      <Tab.Screen name="Home" component={Login} />
      <Tab.Screen name="Settings" component={SignUp} />
    </Tab.Navigator>
  );
}
