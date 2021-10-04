import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Login from "./Login";
import MyTabBar from "../components/TabBar";
const Tab = createMaterialTopTabNavigator();
// type RootStackParamList = {
//   Login: {} | undefined;
//   SignUp: {} | undefined;
// };
//
// type Props = MaterialTopTabScreenProps<RootStackParamList>;
//
// function Login({ navigation }: Props) {
//   return (
//     <View
//       style={{
//         flex: 1,
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
//         <Text>Login</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }
function SignUp() {
  return (
    <View style={styles.container}>
      <Text>SingUp</Text>
    </View>
  );
}

export default function MyTabs() {
  return (
    <Tab.Navigator tabBar={(props: any) => <MyTabBar {...props} />}>
      <Tab.Screen name="Login" component={Login} />
      <Tab.Screen name="SignUp" component={SignUp} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
