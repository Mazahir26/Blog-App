import * as React from "react";
import { View } from "react-native";
import { Card, Paragraph, Title, TouchableRipple } from "react-native-paper";

export default function Home({
  Data,
  onPress,
  index,
}: {
  Data: rssitem;
  onPress: Function;
  index: number;
}) {
  const date = new Date(Data.Published.toString());
  return (
    <Card
      style={{ marginVertical: 10 }}
      elevation={3}
      theme={{ roundness: 10 }}
    >
      <TouchableRipple
        rippleColor="rgba(0, 0, 0, .05)"
        onPress={() => onPress(index)}
        style={{
          padding: 10,
          borderRadius: 10,
        }}
      >
        <Card.Content>
          <Title numberOfLines={5}>{Data.Title} </Title>
          <Paragraph numberOfLines={6}>{Data.Description}</Paragraph>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 7,
            }}
          >
            <Paragraph
              style={{ fontWeight: "700", fontSize: 16 }}
              numberOfLines={1}
            >
              {date.toDateString().slice(0, 11)}
            </Paragraph>
            <Paragraph
              style={{ fontWeight: "bold", fontSize: 16 }}
              numberOfLines={1}
            >
              {Data.Authors}
            </Paragraph>
          </View>
        </Card.Content>
      </TouchableRipple>
    </Card>
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
