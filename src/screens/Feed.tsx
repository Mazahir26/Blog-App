import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { ActivityIndicator, Card } from "react-native-paper";
import { useTheme } from "@react-navigation/native";
import Firebase from "../config/firebase";
import useRssParser from "../hooks/useRssParser";

import { AuthenticatedUserContext } from "../Context/AuthenticatedUserProvider";

const auth = Firebase.auth();

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

export default function Home() {
  const { colors } = useTheme();
  const Data: rssitem[] = useRssParser("https://techcrunch.com/feed");
  // //@ts-ignore
  // const { user }: Context = React.useContext(AuthenticatedUserContext);
  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };
  if (Data == null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          animating={true}
          size={"large"}
          color={colors.text}
        />
      </View>
    );
  }
  return <View style={styles.container}></View>;
}

type rssitem = {
  Title: String;
  Description: String;
  Authors: string | undefined;
  Content: String;
  Link: String;
  Published: String;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 15,
    justifyContent: "center",
  },
});
