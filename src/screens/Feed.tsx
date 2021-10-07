import * as React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useTheme } from "@react-navigation/native";
// import Firebase from "../config/firebase";
import useRssParser from "../hooks/useRssParser";
import Card from "../components/Card";

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
  const { colors } = useTheme();
  // //@ts-ignore
  // const { user }: Context = React.useContext(AuthenticatedUserContext);
  // const handleSignOut = async () => {
  //   try {
  //     await auth.signOut();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const {
    Data,
    refresh,
  }: { Data: rssitem[] | null; refresh: Function } = useRssParser(
    "https://techcrunch.com/rss"
  );

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
        onRefresh={() => refresh()}
        refreshing={Data.length == 0}
        contentContainerStyle={{
          width: "100%",
          marginHorizontal: 0,
        }}
        data={Data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => {
          return <Card Data={item} />;
        }}
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
});
