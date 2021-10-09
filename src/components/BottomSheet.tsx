import * as React from "react";
import {
  StyleSheet,
  useWindowDimensions,
  Text,
  Alert,
  View,
} from "react-native";
import * as WebBrowser from "expo-web-browser";

import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import RenderHtml from "react-native-render-html";
import { IconButton } from "react-native-paper";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Setting a timer"]);
import { Platform, UIManager, LayoutAnimation } from "react-native";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function Bottomsheet({
  Data,
  sheetref,
  Save,
  Saved,
  unSave,
}: {
  Data: rssitem | null;
  sheetref: any;
  Save: Function;
  Saved: rssitem[];
  unSave: Function;
}) {
  const { width } = useWindowDimensions();
  const snapPoints = React.useMemo(() => ["50%", "100%"], []);
  const [isLoading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  // console.log(isSaved);

  React.useEffect(() => {
    setLoading(false);
  }, [Saved, Data]);
  function isSaved() {
    if (Data == null) return false;
    let result = false;
    Saved.map((i) => {
      if (i.Link === Data.Link) {
        result = true;
      }
    });
    return result;
  }
  const tagsStyles = {
    body: {
      color: "gray",
    },
    a: {
      color: "cornflowerblue",
    },
    img: {
      maxWidth: width,
    },
  };
  return (
    <BottomSheet
      enablePanDownToClose
      ref={sheetref}
      index={-1}
      snapPoints={snapPoints}
    >
      <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            marginHorizontal: 15,
          }}
        >
          {Data?.Title}
        </Text>
        <RenderHtml
          baseStyle={{ marginHorizontal: 15, fontSize: 16 }}
          contentWidth={width}
          source={{
            html: Data
              ? Data.Content.toString()
              : "<h1>Something went wrong</h1>",
          }}
          ignoredDomTags={["iframe", "svg"]}
          tagsStyles={tagsStyles}
        />
      </BottomSheetScrollView>
      <View style={styles.fab}>
        {open ? (
          <>
            <IconButton
              animated
              disabled={isLoading}
              icon={isSaved() ? "bookmark" : "bookmark-outline"}
              color="#ececec"
              size={24}
              onPress={() => {
                if (isSaved()) {
                  setLoading(true);
                  unSave();
                  return;
                }
                if (Saved.length >= 5) {
                  Alert.alert(
                    "Saved Posts Limit Reached",
                    "You can't save more than 5 posts, try removing old saved post.",
                    [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                    { cancelable: false }
                  );
                } else {
                  setLoading(true);
                  Save();
                }
              }}
            />
            <IconButton
              disabled={isLoading}
              icon="open-in-app"
              color="#ececec"
              size={24}
              onPress={() =>
                Data != null
                  ? WebBrowser.openBrowserAsync(Data.Link.toString())
                  : null
              }
            />
          </>
        ) : null}
        <IconButton
          animated
          icon={open ? "close" : "plus"}
          disabled={isLoading}
          color="#ececec"
          size={24}
          onPress={() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
            setOpen(!open);
          }}
        />
      </View>
    </BottomSheet>
  );
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
  contentContainer: {
    backgroundColor: "white",
  },
  footerContainer: {
    height: 40,
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 40,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#343434",
    flexDirection: "row",
    borderRadius: 26,
  },
});
//
// <FAB
//   style={styles.fab}
//   color={isSaved() ? "steelblue" : "#ececec"}
//   small={false}
//   icon={isSaved() ? "bookmark" : "bookmark-outline"}
//   loading={isLoading}
//   // label={"save"}
//   onPress={() => {
//     if (Saved.length >= 5) {
//       Alert.alert(
//         "Saved Posts Limit Reached",
//         "You can't save more than 5 posts, try removing old saved post.",
//         [{ text: "OK", onPress: () => console.log("OK Pressed") }],
//         { cancelable: false }
//       );
//     } else {
//       setLoading(true);
//       Save();
//     }
//   }}
// />
