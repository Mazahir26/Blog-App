import * as React from "react";
import * as rssParser from "react-native-rss-parser";

type rssitem = {
  Title: String;
  Description: String;
  Authors: string | undefined;
  Content: String;
  Link: String;
  Published: String;
};
export default function useRssParser(Url: string) {
  const [Data, setData] = React.useState<null | rssitem[]>(null);

  React.useEffect(() => {
    fetch(Url)
      .then((response) => response.text())
      .then((responseData) => rssParser.parse(responseData))
      .then((rss) => {
        let data: rssitem[] = [];
        rss.items.map((item) => {
          const obj = {
            Title: item.title,
            Description: item.description,
            Authors: item.authors[0]?.name,
            Content: item.content,
            Link: item.links[0].url,
            Published: item.published,
          };
          data.push(obj);
        });
        setData(data);
      });
  }, []);

  return Data;
}
