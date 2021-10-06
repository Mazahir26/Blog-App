import * as React from "react";
import { Keyboard } from "react-native";

export default function OnKeyboard() {
  const [keyboardStatus, setKeyboardStatus] = React.useState(false);

  React.useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => setKeyboardStatus(true);
  const _keyboardDidHide = () => setKeyboardStatus(false);

  return keyboardStatus;
}
