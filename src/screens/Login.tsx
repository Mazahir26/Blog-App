import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import { TextInput, HelperText } from "react-native-paper";

export default function Login({ navigation }: Props) {
  const [Email, setEmail] = React.useState("");
  const [Password, setPassword] = React.useState("");
  const [Visible, setVisible] = React.useState(false);
  const [Error, setError] = React.useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.subheading}>Welcome back,</Text>
      <Text style={styles.heading}>Login</Text>
      <TextInput
        error={Error.length > 0}
        style={styles.input}
        label="Email*"
        value={Email}
        onChangeText={(text) => setEmail(text)}
        mode="outlined"
        selectionColor="gray"
        theme={{ colors: { primary: "#343434" }, roundness: 10 }}
      />
      <TextInput
        error={Error.length > 0}
        style={styles.input}
        label="Password*"
        value={Password}
        onChangeText={(text) => setPassword(text)}
        mode="outlined"
        selectionColor="gray"
        theme={{ colors: { primary: "#343434" }, roundness: 10 }}
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
      <TouchableOpacity style={styles.button}>
        <Text style={{ color: "white", fontSize: 18 }}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ alignSelf: "center", marginVertical: 5 }}
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text>New here? SignUp</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ position: "absolute", bottom: 10, alignSelf: "center" }}
      >
        <Text>Don't want an account? Guest login.</Text>
      </TouchableOpacity>
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
