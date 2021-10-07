import * as React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  useWindowDimensions,
  Text,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useTheme } from "@react-navigation/native";
// import Firebase from "../config/firebase";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import useRssParser from "../hooks/useRssParser";
import Card from "../components/Card";
import RenderHtml from "react-native-render-html";

// import { AuthenticatedUserContext } from "../Context/AuthenticatedUserProvider";

// const auth = Firebase.auth();

// type User = {
//   email: string;
//   uid: string;
//   isAnonymous: boolean;
//   displayName: string;
// };
// interface Context {
//   user: User;
//   setUser?: any;
// }

export default function Home() {
  const { width } = useWindowDimensions();
  const { colors } = useTheme();
  const sheetRef = React.useRef<BottomSheet>(null);
  const {
    Data,
    refresh,
  }: { Data: rssitem[] | null; refresh: Function } = useRssParser(
    "https://techcrunch.com/rss"
  );
  const [currentIndex, setcurrentIndex] = React.useState<null | number>(null);
  const [sdata, setsdata] = React.useState({
    html: "",
  });
  const snapPoints = React.useMemo(() => ["50%", "100%"], []);

  React.useEffect(() => {
    if (Data == null || Data.length == 0) return;

    setsdata({
      html: Data
        ? Data[currentIndex ? currentIndex : 0].Content.toString()
        : "",
    });
  }, [currentIndex]);
  React.useEffect(() => {
    handleOpenPress();
  }, [sdata]);
  const handleOpenPress = React.useCallback(() => {
    sheetRef.current?.snapToIndex(0);
  }, []);
  const handleClosePress = React.useCallback(() => {
    sheetRef.current?.close();
  }, []);
  // //@ts-ignore
  // const { user }: Context = React.useContext(AuthenticatedUserContext);
  // const handleSignOut = async () => {
  //   try {
  //     await auth.signOut();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  if (Data == null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          animating={true}
          size={"large"}
          color={colors.text}
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        onRefresh={() => {
          handleClosePress();
          refresh();
        }}
        refreshing={Data.length == 0}
        contentContainerStyle={{
          width: "100%",
          marginHorizontal: 0,
        }}
        data={Data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Card
            Data={item}
            onPress={(i: number) => {
              setcurrentIndex(i);
            }}
            index={index}
          />
        )}
      />
      <BottomSheet
        enablePanDownToClose
        ref={sheetRef}
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
            {Data.length == 0
              ? null
              : Data[currentIndex ? currentIndex : 0].Title}
          </Text>
          <RenderHtml
            baseStyle={{ marginHorizontal: 15, fontSize: 16 }}
            contentWidth={width}
            source={sdata}
            ignoredDomTags={["iframe", "svg"]}
          />
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
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
  container: {
    marginTop: 20,
    flex: 1,
    paddingHorizontal: 15,
  },
  contentContainer: {
    backgroundColor: "white",
  },
  footerContainer: {
    padding: 12,
    margin: 12,
    borderRadius: 12,
    backgroundColor: "#80f",
  },
  footerText: {
    textAlign: "center",
    color: "white",
    fontWeight: "800",
  },
});
