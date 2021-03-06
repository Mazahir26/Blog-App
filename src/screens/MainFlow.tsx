import * as React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Feed from "./Feed";
import Saved from "./SavedPosts";
import Profile from "./Profile";
import MyTabBar from "../components/TabBar";
import axios from "../config/axios";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Platform } from "react-native";
const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();
import * as SecureStore from "expo-secure-store";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

function Tabs() {
  return (
    <Tab.Navigator tabBar={(props: any) => <MyTabBar {...props} />}>
      <Tab.Screen name="Latest" component={Feed} />
      <Tab.Screen name="Saved" component={Saved} />
    </Tab.Navigator>
  );
}

export default function MainFlow() {
  const notificationListener = React.useRef();
  const responseListener = React.useRef();
  const [isUploaded, setisUploaded] = React.useState<null | string>("load");
  const [token, settoken] = React.useState<undefined | string>(undefined);

  React.useEffect(() => {
    if (isUploaded == "load") {
      return;
    }
    if (isUploaded != null) {
      return;
    }
    if (token != undefined) {
      uploadtoken(token);
    }
  }, [token, isUploaded]);
  React.useEffect(() => {
    getValue();
    axios
      .post("analytics/1/open", {
        name: "open",
      })
      .then(() => null)
      .catch(() => null);
    registerForPushNotificationsAsync().then((token) => settoken(token));
    //@ts-ignore
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log(notification);
      }
    );
    //@ts-ignore
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
      }
    );
    return () => {
      Notifications.removeNotificationSubscription(
        //@ts-ignore
        notificationListener.current
      );
      //@ts-ignore
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  async function getValue() {
    let res = await SecureStore.getItemAsync("Id");
    setisUploaded(res);
  }
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Tabs}
      />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}

function uploadtoken(token: string | undefined) {
  if (token == undefined) return;
  axios
    .post("notifications", {
      key: token,
    })
    .then(() => {
      save(token);
    })
    .catch((err) => {
      console.log(err);
    });
}
async function save(value: string) {
  await SecureStore.setItemAsync("Id", value);
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const {
      status: existingStatus,
    } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
  return token;
}
