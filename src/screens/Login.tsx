import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Firebase from "../config/firebase";
import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import AuthTextInput from "../components/AuthInputs";
import { useTheme } from "@react-navigation/native";
import useOnKeyboard from "../hooks/useOnKeyboard";
import axios from "../config/axios";
const auth = Firebase.auth();

export default function Login({ navigation }: Props) {
  const keyboardStatus = useOnKeyboard();
  const { colors } = useTheme();
  const [Email, setEmail] = React.useState("");
  const [Password, setPassword] = React.useState("");
  const [Error, setError] = React.useState("");

  const onLogin = async () => {
    try {
      if (Email !== "" && Password !== "") {
        await auth.signInWithEmailAndPassword(Email, Password);
        axios
          .post("analytics/1/open", {
            name: "login",
          })
          .then(() => null)
          .catch(() => null);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const signInAnonymously = async () => {
    try {
      await auth.signInAnonymously();
      axios
        .post("analytics/1/open", {
          name: "anonymous",
        })
        .then(() => null)
        .catch(() => null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.subheading, { color: colors.text }]}>
        Welcome back,
      </Text>
      <Text style={[styles.heading, { color: colors.text }]}>Login</Text>
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
        onPress={() => onLogin()}
        style={[styles.button, { backgroundColor: colors.primary }]}
      >
        <Text
          style={{
            color: colors.background,
            fontSize: 18,
            fontFamily: "Poppins_300Light",
          }}
        >
          Login
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ alignSelf: "center", marginVertical: 5 }}
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text style={{ color: colors.text, fontFamily: "Poppins_300Light" }}>
          New here? SignUp
        </Text>
      </TouchableOpacity>
      {keyboardStatus ? null : (
        <TouchableOpacity
          onPress={signInAnonymously}
          style={{ position: "absolute", bottom: 10, alignSelf: "center" }}
        >
          <Text style={{ color: colors.text, fontFamily: "Poppins_300Light" }}>
            Don't want an account? Guest login.
          </Text>
        </TouchableOpacity>
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
