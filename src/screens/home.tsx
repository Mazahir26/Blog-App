import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import Firebase from "../config/firebase";

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
  //@ts-ignore
  const { user }: Context = React.useContext(AuthenticatedUserContext);
  console.log(auth.currentUser);
  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: colors.text }}>Hey There, {user.displayName}</Text>
      <TouchableOpacity onPress={() => handleSignOut()}>
        <Text style={{ color: colors.text }}>SignOut</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 15,
    justifyContent: "center",
  },
});
