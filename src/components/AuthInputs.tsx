import * as React from "react";
import { TextInput, HelperText } from "react-native-paper";
import { useTheme } from "@react-navigation/native";

type Props = {
  value: string;
  setvalue: Function;
  isPassWord: boolean;
  isLoading: boolean;
  placeHolder: string;
  error: string;
};

export default function AuthTextInput({
  value,
  setvalue,
  isLoading,
  isPassWord,
  placeHolder,
  error,
}: Props) {
  const { colors } = useTheme();
  const [Visible, setVisible] = React.useState(false);

  return (
    <>
      <TextInput
        error={error.length > 0}
        style={{
          marginTop: 12,
        }}
        disabled={isLoading}
        label={placeHolder}
        value={value}
        onChangeText={(text) => setvalue(text)}
        mode="outlined"
        selectionColor="gray"
        textContentType={isPassWord ? "password" : "emailAddress"}
        theme={{ colors: { primary: colors.primary }, roundness: 10 }}
        secureTextEntry={!Visible && isPassWord}
        placeholder={placeHolder}
        right={
          isPassWord ? (
            <TextInput.Icon
              name={Visible ? "eye" : "eye-off"}
              onPress={() => setVisible(!Visible)}
            />
          ) : null
        }
      />
      {isPassWord ? (
        <HelperText type="error" visible={error.length > 0}>
          {error}
        </HelperText>
      ) : null}
    </>
  );
}
