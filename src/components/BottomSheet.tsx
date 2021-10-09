import * as React from "react";
import { StyleSheet, useWindowDimensions, Text, Alert } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import RenderHtml from "react-native-render-html";
import { FAB } from "react-native-paper";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Setting a timer"]);
// import Firebase from "../config/firebase";
// const auth = Firebase.auth();
// const firestore = Firebase.firestore();

export default function Bottomsheet({
  Data,
  sheetref,
  Save,
  Saved,
}: {
  Data: rssitem | null;
  sheetref: any;
  Save: Function;
  Saved: rssitem[];
}) {
  const { width } = useWindowDimensions();
  const snapPoints = React.useMemo(() => ["50%", "100%"], []);
  // console.log(isSaved);
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
      <FAB
        style={styles.fab}
        color={isSaved() ? "steelblue" : "#ececec"}
        small={false}
        icon={isSaved() ? "bookmark" : "bookmark-outline"}
        // label={"save"}
        onPress={() => {
          if (Saved.length >= 5) {
            Alert.alert(
              "Saved Posts Limit Reached",
              "You can't save more than 5 posts, try removing old saved post.",
              [{ text: "OK", onPress: () => console.log("OK Pressed") }],
              { cancelable: false }
            );
          } else Save();
        }}
      />
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
  },
});
