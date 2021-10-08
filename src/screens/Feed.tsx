import * as React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useTheme } from "@react-navigation/native";
import BottomSheet from "@gorhom/bottom-sheet";
import useRssParser from "../hooks/useRssParser";
import Card from "../components/Card";
import Bottomsheet from "../components/BottomSheet";

import Firebase from "../config/firebase";
const auth = Firebase.auth();
const firestore = Firebase.firestore();

function save(Data: rssitem | null) {
  if (Data == null) return;
  try {
    firestore.collection(auth.currentUser.uid).doc(Data.Title).set({
      Title: Data.Title,
      Description: Data.Description,
      Published: Data.Published,
      Author: Data.Authors,
      Link: Data.Link,
    });
  } catch (e) {
    console.warn("Error adding document: ", e);
  }
}

export default function Home() {
  const { colors } = useTheme();
  const {
    Data,
    refresh,
  }: { Data: rssitem[] | null; refresh: Function } = useRssParser(
    "https://techcrunch.com/rss"
  );

  const sheetRef = React.useRef<BottomSheet>(null);
  const [currentIndex, setcurrentIndex] = React.useState<null | number>(null);
  const [Saved, setSaved] = React.useState<[] | rssitem[]>([]);

  function getSaved() {
    let d: any = [];
    try {
      firestore
        .collection(auth.currentUser.uid)
        .get()
        .then((querySnapshot: any) => {
          console.log("Total Feeds", querySnapshot.size);
          if (querySnapshot.size > 0) {
            querySnapshot.forEach((documentSnapshot: any) => {
              d.push(documentSnapshot.data());
            });
            setSaved(d);
          }
        });
    } catch (e) {
      console.warn("Error adding document: ", e);
    }
  }

  const handleOpenPress = React.useCallback(() => {
    sheetRef.current?.snapToIndex(0);
  }, []);
  const handleClosePress = React.useCallback(() => {
    sheetRef.current?.close();
  }, []);
  React.useEffect(() => {
    getSaved();
  }, []);
  React.useEffect(() => {
    if (currentIndex !== null) {
      handleOpenPress();
    }
  }, [currentIndex]);

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
          setcurrentIndex(null);
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
              handleClosePress();
              setcurrentIndex(i);
              if (i == currentIndex) {
                handleOpenPress();
              }
            }}
            index={index}
          />
        )}
      />
      <Bottomsheet
        Data={currentIndex === null ? null : Data[currentIndex]}
        sheetref={sheetRef}
        Save={() => save(currentIndex === null ? null : Data[currentIndex])}
        isSaved={
          currentIndex === null ? false : Saved.includes(Data[currentIndex])
        }
      />
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
