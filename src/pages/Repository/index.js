import React from "react";
import { WebView } from "react-native-webview";

// import { Container } from './styles';

export default function Repository({ navigation }) {
  return (
    <WebView
      source={{
        uri: `${navigation.getParam("repository").html_url}`
      }}
      style={{ flex: 1 }}
    />
  );
}
