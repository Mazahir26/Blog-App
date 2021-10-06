import * as React from "react";
import {
  View,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Text,
  Image,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";

type User = {
  email: string;
  uid: string;
  isAnonymous: boolean;
  displayName: string;
  photoURL: string;
};

export default function MyTabBar({
  state,
  descriptors,
  navigation,
  position,
  user,
}: any) {
  const User: User = user;
  const { colors, dark } = useTheme();
  const width = 100;
  const inputRange = state.routes.map((_: any, i: any) => i);
  const op = position.interpolate({
    inputRange,
    outputRange: inputRange.map((i: any) => i * (width + 5) + 120),
  });
  return (
    <View style={[styles.TabBar, { backgroundColor: colors.background }]}>
      <View
        style={{
          height: 45,
          flexDirection: "row",
          paddingHorizontal: 15,
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 5,
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            color: colors.primary,
          }}
        >
          TC
        </Text>

        <Image
          style={{
            height: 35,
            width: 35,
          }}
          source={{
            uri: User.photoURL
              ? User.photoURL
              : "https://ui-avatars.com/api/?rounded=true&background=343434&size=128&bold=true&name=Anonymous",
          }}
        />
      </View>
      <StatusBar backgroundColor={colors.background} />
      <View style={{ alignSelf: "center" }}>
        <Animated.View
          style={{
            position: "absolute",
            height: 40,
            width: width,
            backgroundColor: colors.primary,
            transform: [{ translateX: op }],
            borderRadius: width / 2,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignSelf: "stretch",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              color: colors.primary,
              overflow: "hidden",
              width: 70,
              textAlign: "center",
              marginRight: 50,
            }}
          >
            Blogs
          </Text>
          <View
            style={{
              flexDirection: "row",
              width: state.routes.length * width + 5,
              height: 40,
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
              const Scale = position.interpolate({
                inputRange,
                outputRange: inputRange.map((i: any) =>
                  i === index ? 1 : 0.8
                ),
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
                  <View
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
                        transform: [{ scale: Scale }],
                        textAlign: "center",
                        color: dark ? "#343434" : "#ececec",
                        position: "absolute",
                      }}
                    >
                      {label}
                    </Animated.Text>
                    <Animated.Text
                      style={{
                        opacity: opacity_2,
                        transform: [{ scale: Scale }],
                        textAlign: "center",
                        color: colors.text,
                        position: "absolute",
                      }}
                    >
                      {label}
                    </Animated.Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  TabBar: {
    marginTop: Constants.statusBarHeight ? Constants.statusBarHeight : 30,
    alignSelf: "stretch",
  },
});

// accessibilityRole="button"
// accessibilityState={isFocused ? { selected: true } : {}}
// accessibilityLabel={options.tabBarAccessibilityLabel}
