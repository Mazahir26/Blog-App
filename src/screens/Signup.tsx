import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import { useTheme } from "@react-navigation/native";
import AuthTextInput from "../components/AuthInputs";
import axios from "../config/axios";
import Firebase from "../config/firebase";
import useOnKeyboard from "../hooks/useOnKeyboard";

const auth = Firebase.auth();

export default function Login({ navigation }: Props) {
  const keyboardStatus = useOnKeyboard();
  const { colors } = useTheme();
  const [Email, setEmail] = React.useState("");
  const [Name, setName] = React.useState("");
  const [Password, setPassword] = React.useState("");
  const [Error, setError] = React.useState("");

  const updateProfile = async () => {
    try {
      await auth.currentUser.updateProfile({
        displayName: Name,
        photoURL:
          "https://ui-avatars.com/api/?rounded=true&background=343434&size=128&bold=true&color=ececec&name=" +
          Name,
      });
    } catch (e) {
      console.log(e);
    }
  };
  const onSingup = async () => {
    try {
      if (Email !== "" && Password !== "" && Name !== "") {
        await auth.createUserWithEmailAndPassword(Email, Password);
        axios
          .post("analytics/1/open", {
            name: "signup",
          })
          .then(() => null)
          .catch(() => null);
        updateProfile();
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const signInAnonymously = async () => {
    try {
      await auth.signInAnonymously();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.subheading, { color: colors.text }]}>
        Hey There,
      </Text>
      <Text style={[styles.heading, { color: colors.text }]}>SignUp</Text>
      <AuthTextInput
        value={Name}
        setvalue={(t: string) => setName(t)}
        isPassWord={false}
        isLoading={false}
        placeHolder="Name*"
        error={Error}
      />
      <AuthTextInput
        value={Email}
        setvalue={(t: string) => setEmail(t)}
        isPassWord={false}
        isLoading={false}
        placeHolder="Email*"
        error={Error}
      />
      <AuthTextInput
        value={Password}
        setvalue={(t: string) => setPassword(t)}
        isPassWord={true}
        isLoading={false}
        placeHolder="Password*"
        error={Error}
      />
      <TouchableOpacity
        onPress={() => onSingup()}
        style={[styles.button, { backgroundColor: colors.primary }]}
      >
        <Text
          style={{
            color: colors.background,
            fontSize: 18,
            fontFamily: "Poppins_300Light",
          }}
        >
          SignUp
        </Text>
      </TouchableOpacity>

      {keyboardStatus ? null : (
        <>
          <TouchableOpacity
            style={{ alignSelf: "center", marginVertical: 5 }}
            onPress={() => navigation.navigate("Login")}
          >
            <Text
              style={{ color: colors.text, fontFamily: "Poppins_300Light" }}
            >
              Already have an account? Login.
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={signInAnonymously}
            style={{ position: "absolute", bottom: 10, alignSelf: "center" }}
          >
            <Text
              style={{ color: colors.text, fontFamily: "Poppins_300Light" }}
            >
              Don't want an account? Guest login.
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

type RootStackParamList = {
  Login: {} | undefined;
  SignUp: {} | undefined;
};

type Props = MaterialTopTabScreenProps<RootStackParamList>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    paddingHorizontal: 15,
    justifyContent: "center",
  },
  heading: {
    // fontWeight: "bold",
    fontSize: 38,
    alignSelf: "center",
    marginBottom: 20,
    color: "#343434",
    fontFamily: "Poppins_500Medium",
  },
  subheading: {
    fontWeight: "600",
    fontSize: 18,
    alignSelf: "center",
    color: "#343434",
    fontFamily: "Poppins_300Light",
  },
  input: {
    marginTop: 12,
  },
  button: {
    backgroundColor: "#343434",
    height: 45,
    borderRadius: 55,
    alignSelf: "center",
    width: 110,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
});
