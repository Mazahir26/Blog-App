import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import Firebase from "../config/firebase";

const auth = Firebase.auth();
export default function Home() {
  const { colors } = useTheme();
  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={{ color: colors.text }}>Hey There</Text>
      <TouchableOpacity onPress={() => handleSignOut()}>
        <Text style={{ color: colors.text }}>SignOut</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    paddingHorizontal: 15,
    justifyContent: "center",
  },
});
