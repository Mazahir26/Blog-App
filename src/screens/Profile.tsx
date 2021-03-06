import * as React from "react";
import { View, StyleSheet, Text, Image, Linking, Alert } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Button, IconButton } from "react-native-paper";
import axios from "../config/axios";

import Firebase from "../config/firebase";
import { AuthenticatedUserContext } from "../Context/AuthenticatedUserProvider";
const auth = Firebase.auth();

export default function Profile() {
  const { colors } = useTheme();
  //@ts-ignore
  const { user }: Context = React.useContext(AuthenticatedUserContext);
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      axios
        .post("analytics/1/open", {
          name: "logout",
        })
        .then(() => null)
        .catch(() => null);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          style={styles.Image}
          source={{
            uri: user.photoURL
              ? user.photoURL
              : "https://ui-avatars.com/api/?rounded=true&background=343434&size=128&bold=true&color=ececec&name=Anonymous",
          }}
        />
        <Text style={[styles.heading, { color: colors.text }]}>
          {user.isAnonymous ? "Anonymous" : user.displayName}
        </Text>
        {user.isAnonymous ? null : (
          <Text style={[styles.heading, { color: colors.text }]}>
            {user.email}
          </Text>
        )}
      </View>
      <View style={{ flex: 1, alignSelf: "stretch" }}>
        <View style={styles.buttonContainer}>
          <Text style={[styles.buttontext, { color: colors.text }]}>
            Terms Of Use
          </Text>
          <IconButton
            icon="database"
            animated
            color={colors.primary}
            size={26}
            onPress={() => console.log("ok")}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Text style={[styles.buttontext, { color: colors.text }]}>
            Open Source License
          </Text>
          <IconButton
            icon="file-document-outline"
            animated
            color={colors.primary}
            size={26}
            onPress={() =>
              Linking.openURL(
                "https://github.com/Mazahir26/Blog-App/blob/main/LICENSE.md"
              )
            }
          />
        </View>
      </View>
      <Button
        style={styles.Button}
        mode="outlined"
        onPress={() => {
          Alert.alert("Are you sure?", "This will log you out.", [
            {
              text: "Cancel",
              onPress: () => null,
              style: "cancel",
            },
            { text: "Yes", onPress: () => handleSignOut() },
          ]);
        }}
        color="firebrick"
      >
        Logout
      </Button>
      <Button
        style={styles.Button}
        mode="outlined"
        color="dodgerblue"
        onPress={() =>
          Linking.openURL("mailto:support@example.com?subject=Bug Report")
        }
      >
        Report a Bug
      </Button>
      <Text style={[styles.Websitelinkcontainer, { color: colors.text }]}>
        Website:
        <Text
          onPress={() => Linking.openURL("http://techcrunch.com/")}
          style={styles.Websitelink}
        >
          http://techcrunch.com/
        </Text>
      </Text>
      <Text style={[styles.verText, { color: colors.text }]}>
        Version: v0.1.0
      </Text>
      <Text style={[styles.verText, { color: colors.text }]}>
        UID: {user.uid}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    paddingHorizontal: 15,
    alignItems: "center",
  },
  buttonContainer: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "whitesmoke",
    marginVertical: 5,
  },
  headerContainer: {
    flex: 1,
    alignItems: "center",
  },
  Image: {
    height: 128,
    width: 128,
    marginVertical: 5,
  },
  heading: {
    fontSize: 24,
    marginVertical: 5,
  },
  Websitelinkcontainer: {
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.7,
  },
  Websitelink: {
    color: "dodgerblue",
    textAlignVertical: "center",
    marginBottom: 5,
    marginVertical: 5,
  },
  buttontext: {
    fontWeight: "bold",
    fontSize: 20,
  },
  verText: {
    opacity: 0.7,
    marginVertical: 3,
  },
  Button: {
    marginBottom: 10,
    width: 160,
  },
});

// const auth = Firebase.auth();

type User = {
  email: string;
  uid: string;
  isAnonymous: boolean;
  displayName: string;
  photoURL: string;
};
interface Context {
  user: User;
  setUser?: any;
}
