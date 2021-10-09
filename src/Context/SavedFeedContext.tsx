import createDataContext from "./createDataContext";
import Firebase from "../config/firebase";
import { ToastAndroid } from "react-native";
const auth = Firebase.auth();
const firestore = Firebase.firestore();

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
      if (typeof action.payload == "object") {
        const t: rssitem[] = [];
        state.map((item) => {
          //@ts-ignore
          if (item.Link != action.payload.Link) {
            //@ts-ignore
            t.push(action.payload);
          }
        });
        return t;
      } else return state;
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
    dispatch({ type: "addSavedFeed", payload: d });
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
  { SaveFeed, getFeed },
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
