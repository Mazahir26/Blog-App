import * as React from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useTheme } from "@react-navigation/native";
import Card from "../components/SaveCard";
import { Context } from "../Context/SavedFeedContext";
export default function SavedPosts() {
  const { colors } = useTheme();

  const { state, Deletepost, getFeed }: any = React.useContext(Context);

  // //@ts-ignore
  // const { user }: Context = React.useContext(AuthenticatedUserContext);
  // const handleSignOut = async () => {
  //   try {
  //     await auth.signOut();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  if (state == null) {
    return (
      <View style={[styles.container, {justifyContent: "center"}]}>
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
          getFeed();
        }}
        ListEmptyComponent={() => (
          <View
            style={[
              styles.container,
              {
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <Text
              style={{ fontSize: 22, fontWeight: "bold", textAlign: "center" }}
            >
              Looks Empty {"\n"} Try to save a post.
            </Text>
          </View>
        )}
        refreshing={state == null}
        contentContainerStyle={{
          width: "100%",
          marginHorizontal: 0,
        }}
        data={state}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Card
            Data={item}
            onDelete={(i: number) => {
              Deletepost(state[i]);
            }}
            index={index}
          />
        )}
      />
    </View>
  );
}
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
