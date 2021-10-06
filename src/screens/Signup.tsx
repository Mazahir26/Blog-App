import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import Firebase from "../config/firebase";
import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import { TextInput, HelperText } from "react-native-paper";
import { useTheme } from "@react-navigation/native";

const auth = Firebase.auth();

export default function Login({ navigation }: Props) {
  const { colors } = useTheme();
  const [Email, setEmail] = React.useState("");
  const [Password, setPassword] = React.useState("");
  const [Visible, setVisible] = React.useState(false);
  const [Error, setError] = React.useState("");

  const onSingup = async () => {
    try {
      if (Email !== "" && Password !== "") {
        await auth.createUserWithEmailAndPassword(Email, Password);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  React.useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);

  const [keyboardStatus, setKeyboardStatus] = React.useState(false);
  const _keyboardDidShow = () => setKeyboardStatus(true);
  const _keyboardDidHide = () => setKeyboardStatus(false);

  return (
    <View style={styles.container}>
      <Text style={[styles.subheading, { color: colors.text }]}>
        Hey There,
      </Text>
      <Text style={[styles.heading, { color: colors.text }]}>SignUp</Text>
      <TextInput
        error={Error.length > 0}
        style={styles.input}
        label="Email*"
        value={Email}
        onChangeText={(text) => setEmail(text)}
        mode="outlined"
        selectionColor="gray"
        theme={{ colors: { primary: colors.primary }, roundness: 10 }}
      />
      <TextInput
        error={Error.length > 0}
        style={styles.input}
        label="Password*"
        value={Password}
        onChangeText={(text) => setPassword(text)}
        mode="outlined"
        selectionColor="gray"
        theme={{ colors: { primary: colors.primary }, roundness: 10 }}
        secureTextEntry={Visible}
        right={
          <TextInput.Icon
            name={Visible ? "eye" : "eye-off"}
            onPress={() => setVisible(!Visible)}
          />
        }
      />
      <HelperText type="error" visible={Error.length > 0}>
        Email address is invalid!
      </HelperText>
      <TouchableOpacity
        onPress={() => onSingup()}
        style={[styles.button, { backgroundColor: colors.primary }]}
      >
        <Text style={{ color: colors.background, fontSize: 18 }}>SignUp</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ alignSelf: "center", marginVertical: 5 }}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={{ color: colors.text }}>
          Already have an account? Login.
        </Text>
      </TouchableOpacity>
      {keyboardStatus ? null : (
        <TouchableOpacity
          style={{ position: "absolute", bottom: 10, alignSelf: "center" }}
        >
          <Text style={{ color: colors.text }}>
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
    fontWeight: "bold",
    fontSize: 38,
    alignSelf: "center",
    marginBottom: 20,
    color: "#343434",
  },
  subheading: {
    fontWeight: "600",
    fontSize: 18,
    alignSelf: "center",
    color: "#343434",
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
