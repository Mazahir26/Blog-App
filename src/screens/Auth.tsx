import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabScreenProps,
} from "@react-navigation/material-top-tabs";
import MyTabBar from "../components/TabBar";
const Tab = createMaterialTopTabNavigator();
import BottomSheet from "@gorhom/bottom-sheet";
type RootStackParamList = {
  Login: {} | undefined;
  SignUp: {} | undefined;
};

type Props = MaterialTopTabScreenProps<RootStackParamList>;

function Login({ navigation }: Props) {
  console.log(navigation);
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
  const bottomSheetRef = React.useRef<BottomSheet>(null);

  // variables
  const snapPoints = React.useMemo(() => ["25%", "50%"], []);

  // callbacks
  const handleSheetChanges = React.useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  const handleClosePress = React.useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);
  const handleOpenPress = React.useCallback(() => {
    bottomSheetRef.current?.collapse();
  }, []);
  // renders
  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
      >
        <View style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheet>
      <TouchableOpacity onPress={handleClosePress}>
        <Text>SingUp</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleOpenPress}>
        <Text>open</Text>
      </TouchableOpacity>
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
    padding: 24,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
