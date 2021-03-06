# Blog App

It's an open-source app, that let's a blogger(dev.to, medium.com, wordpress.com or any other website that has rss) to make an app based on his/her blog.

## Table of Contents

- [About](#about)
- [Getting Started](#getting-started)
- [Features](#features)

## About

As mentioned above, any blogger or developer who wants an app that show people its blog.
But that's not it, this app is not just showing a website in an app, duh.
it has Authentication, Basic Analytics, Push Notifications, Save Blogs and much more.
and the best part is, its free. You have to Set-up some stuff, but then you are good to go.

## Getting Started

You can check out the demo [here](https://github.com/Mazahir26/Blog-App/releases/tag/v1.0.0), if you want to make this app your own then follow the steps.

### 1. Step 1

- You need to set-up the server, which can be done [here](https://github.com/Mazahir26/Blog-App-Backend).

### 2. Step 2

- We will set the app up

- We will need a firebase account to send notifications and store data.

- Create a firebase account and create a new project there [Firebase](https://console.firebase.google.com/)

- Create a new web app & enable Authentication and firestore [Firebase Docs](https://firebase.google.com/docs/web/setup)

- Clone the repo `$ git clone git@github.com:Mazahir26/Blog-App.git`

- Install dependencies `$ npm install` or `$ yarn install`

- Inside `src/config/config.js`

  ```
  export const firebaseConfig = {
    apiKey: "Firebase Api key",
    authDomain: "authDomain",
    projectId: "projectId",
    storageBucket: "storageBucket",
    messagingSenderId: "messagingSenderId",
    appId: "appId",
    measurementId: "measurementId",
  };
  export const config = {
    baseURL: "https://example.herokuapp.com/", // Link to your hosted heroku app
    api_key: "Token",
  };
  ```

  > Add the correct credentials & keys

- For push notifications to work we need one more step, you can follow this [guide](https://docs.expo.dev/push-notifications/using-fcm/#client-setup)

- Finally you can test the app by running `$ expo start`
  but you might notice that it loads its default [Techcrunch](https://techcrunch.com/)

- To change the blog website, `src/screens/Feed.tsx`

  ```
  ...
  const {
  Data,
  refresh,
  }: { Data: rssitem[] | null; refresh: Function } = useRssParser(
  "https://YourWebsite.com/rss"
  );
  ...
  ```

- Also you can change Website link, Email and other stuff
  inside `src/screens/Profile.tsx`

- You can also change icons and splash image inside `/assets`.

- Other than that if you know what you are doing or you are an expo dev then go nuts :wink:.

### 3. Step 3

- You can setup the Admin App to send push notifications and to see your userbase grow (Analytics). [here](https://github.com/Mazahir26/Blog-App-Backend)

## Build

- Run on both Android & iOS: `expo start` (or `npm start`).

- Run on Android: `yarn android` (or `npm run android`).

- Run on iOS: `yarn ios` (or `npm run ios`).

- Build `expo build`

## Preview
<img  src = "https://user-images.githubusercontent.com/46394948/137863725-f34337b8-d6ac-4006-a6ad-49d2e393e508.png" width="200"/> <img src = "https://user-images.githubusercontent.com/46394948/137863733-190e0af1-3499-4bf2-ae52-267a78f5de7f.png" width="200"/>
<img src = "https://user-images.githubusercontent.com/46394948/137863736-83c400b4-bacd-4732-a705-c01b6db2ceee.png" width="200"/> <img src = "https://user-images.githubusercontent.com/46394948/137863741-1d709431-d02a-4cd0-9126-12f257d7ed79.png" width="200"/>

## Features

- Notification Support
- Save and Remove Blogs
- Anonymous login
- Minimal design
- Analytics
- and much more..

## Found a Bug

I have tested it Andriod 10.0 and uses expo SDK 42

- if you find any bugs, please raise an issue
- or, [contact me](http://mazahir26.github.io/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Thank You

Thanks for checking out my project, I would love to see your implementations of the app, you can [contact](http://mazahir26.github.io/) me via Mail or Telegram

