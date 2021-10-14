import createDataContext from "./createDataContext";
import Firebase from "../config/firebase";
import { ToastAndroid } from "react-native";
const auth = Firebase.auth();
const firestore = Firebase.firestore();
import { Platform, UIManager, LayoutAnimation } from "react-native";
import axios from "../config/axios";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const SavedReducer = (state: rssitem[], action: ActionTypes) => {
  switch (action.type) {
    case "addSavedFeed":
      let notdupli = true;
      state.map((i) => {
        if (i.Link === action.payload.Link) {
          notdupli = false;
        }
      });
      if (notdupli) {
        ToastAndroid.show("Saved", ToastAndroid.SHORT);
        return [...state, action.payload];
      } else return state;
    case "getSavedFeed":
      return action.payload;
    case "removeSavedFeed":
      const t: rssitem[] = [];
      state.map((item) => {
        if (item.Link !== action.payload.Link) {
          t.push(item);
        }
      });
      LayoutAnimation.configureNext(
        LayoutAnimation.create(
          200,
          LayoutAnimation.Types.linear,
          LayoutAnimation.Properties.scaleY
        )
      );
      ToastAndroid.show("Removed", ToastAndroid.SHORT);

      return t;
    default:
      return state;
  }
};

const SaveFeed = (dispatch: any) => async (Data: rssitem) => {
  if (Data == null) return;

  try {
    const d = {
      Title: Data.Title,
      Description: Data.Description,
      Published: Data.Published,
      Author: Data.Authors,
      Link: Data.Link,
    };
    await firestore.collection(auth.currentUser.uid).doc(Data.Title).set(d);
    axios
      .post("analytics/1/open", {
        name: "save_feed",
      })
      .then(() => null)
      .catch(() => null);
    dispatch({ type: "addSavedFeed", payload: d });
  } catch (e) {
    console.warn("Error adding document: ", e);
  }
};
const Deletepost = (dispatch: any) => async (Data: rssitem) => {
  if (Data == null) return;

  try {
    const d = {
      Title: Data.Title,
      Description: Data.Description,
      Published: Data.Published,
      Author: Data.Authors,
      Link: Data.Link,
    };
    await firestore
      .collection(auth.currentUser.uid)
      .doc(Data.Title)
      .delete()
      .then(() => {
        dispatch({ type: "removeSavedFeed", payload: d });
      });
    axios
      .post("analytics/1/open", {
        name: "remove_feed",
      })
      .then(() => null)
      .catch(() => null);
  } catch (e) {
    console.warn("Error adding document: ", e);
  }
};
const getFeed = (dispatch: any) => async () => {
  let d: rssitem[] = [];
  try {
    await firestore
      .collection(auth.currentUser.uid)
      .get()
      .then((querySnapshot: any) => {
        if (querySnapshot.size > 0) {
          querySnapshot.forEach((documentSnapshot: any) => {
            d.push(documentSnapshot.data());
          });
        }
        dispatch({ type: "getSavedFeed", payload: d });
      });
  } catch (e) {
    console.warn("Error adding document: ", e);
  }
};

export const { Provider, Context } = createDataContext(
  SavedReducer,
  { SaveFeed, getFeed, Deletepost },
  null
);

type rssitem = {
  Title: String;
  Description: String;
  Authors: string | undefined;
  Content: String;
  Link: String;
  Published: String;
};

type ActionTypes = {
  type: "getSavedFeed" | "addSavedFeed" | "removeSavedFeed";
  payload: rssitem;
};
