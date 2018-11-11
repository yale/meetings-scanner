/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import Notifications from "./components/notifications";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

type Props = {};
type State = {
  scanning: boolean,
  notifications: string[]
};

export default class App extends Component<Props, State> {
  state = {
    scanning: false,
    notifications: []
  };
  scanner: ?{ reactivate: () => void };

  onScan = async (event: { data: string }) => {
    this.setState({ scanning: true });

    try {
      const response = await fetch("https://34e7c8c8.ngrok.io/api/v1/scans", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          data: event.data
        })
      }).then(res => res.json());

      this.setState({
        notifications: this.state.notifications.concat(response.message)
      });
    } catch (e) {
      console.error(e);
    } finally {
      this.setState({ scanning: false });
      setTimeout(() => {
        this.scanner && this.scanner.reactivate();
      }, 3000);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Notifications notifications={this.state.notifications} />
        <View style={styles.scanner}>
          <QRCodeScanner
            onRead={this.onScan}
            ref={node => {
              this.scanner = node;
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "stretch",
    backgroundColor: "#F5FCFF"
  },
  scanner: {
    flex: 3
  }
});
