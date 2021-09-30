import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";
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
      //         tabStyle: {
      //             borderRadius: 100,
      //         },
      //     }}
      //     swipeEnabled={true}>
      // tabBar={(props) => <MyTabBar {...props} />}
      screenOptions={{
        activeTintColor: "white",
        tabBarLabelStyle: { textTransform: "uppercase" },
        inactiveTintColor: "gray",
        tabBarIndicatorStyle: {
          height: null,
          top: "10%",
          bottom: "10%",
          width: "45%",
          left: "2.5%",
          borderRadius: 100,
          backgroundColor: "yellow",
        },
        tabBarContentContainerStyle: {
          alignSelf: "center",
          width: "50%",
          borderRadius: 100,
          borderColor: "blue",
          backgroundColor: "white",
          elevation: 5, // shadow on Android
          shadowOpacity: 0.1, // shadow on iOS,
          shadowRadius: 4, // shadow blur on iOS
        },
      }}
    >
      <Tab.Screen name="Home" component={Login} />
      <Tab.Screen name="Settings" component={SignUp} />
    </Tab.Navigator>
  );
}

function MyTabBar({ state, descriptors, navigation, position }) {
  const inputRange = state.routes.map((_, i) => i);
  const opacity = position.interpolate({
    inputRange,
    outputRange: inputRange.map((i) => (i === state.index ? 1 : 0.5)),
  });
  return (
    <View style={styles.TabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map((i) => (i === index ? 1 : 0)),
        });

        return (
          <TouchableOpacity
            key={label}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ justifyContent: "center", flex: 1 }}
          >
            <Animated.Text style={{ opacity }}>{label}</Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  TabBar: {
    flexDirection: "row",
    marginTop: 30,
    height: 45,
  },
});

// accessibilityRole="button"
// accessibilityState={isFocused ? { selected: true } : {}}
// accessibilityLabel={options.tabBarAccessibilityLabel}
