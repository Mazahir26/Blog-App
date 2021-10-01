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
    <Tab.Navigator tabBar={(props: any) => <MyTabBar {...props} />}>
      <Tab.Screen name="Home" component={Login} />
      <Tab.Screen name="Settings" component={SignUp} />
    </Tab.Navigator>
  );
}

function MyTabBar({ state, descriptors, navigation, position }: any) {
  const width = 100;
  const inputRange = state.routes.map((_: any, i: any) => i);
  const op = position.interpolate({
    inputRange,
    outputRange: inputRange.map((i: any) => i * (width + 5)),
  });
  return (
    <View style={styles.TabBar}>
      <Animated.View
        style={{
          position: "absolute",
          height: 45,
          width: width,
          backgroundColor: "#343434",
          transform: [{ translateX: op }],
          borderRadius: width / 2,
        }}
      />
      <View
        style={{
          flexDirection: "row",
          borderWidth: 1,
          width: state.routes.length * width + 5,
          height: 45,
          borderRadius: (state.routes.length * width + 5) / 2,
        }}
      >
        {state.routes.map((route: any, index: any) => {
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

          const inputRange = state.routes.map((_: any, i: any) => i);
          const opacity = position.interpolate({
            inputRange,
            outputRange: inputRange.map((i: any) => (i === index ? 1 : 0)),
          });
          const opacity_2 = position.interpolate({
            inputRange,
            outputRange: inputRange.map((i: any) => (i === index ? 0 : 1)),
          });
          return (
            <TouchableOpacity
              key={label}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                width: width,
                marginRight: 5,
              }}
            >
              <Animated.View
                style={{
                  justifyContent: "center",
                  flex: 1,
                  borderRadius: width / 2,
                  alignItems: "center",
                }}
              >
                <Animated.Text
                  style={{
                    opacity,
                    textAlign: "center",
                    color: "white",
                    position: "absolute",
                  }}
                >
                  {label}
                </Animated.Text>
                <Animated.Text
                  style={{
                    opacity: opacity_2,
                    textAlign: "center",
                    color: "black",
                    position: "absolute",
                  }}
                >
                  {label}
                </Animated.Text>
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  TabBar: {
    marginTop: 30,
    alignSelf: "center",
  },
});

// accessibilityRole="button"
// accessibilityState={isFocused ? { selected: true } : {}}
// accessibilityLabel={options.tabBarAccessibilityLabel}
