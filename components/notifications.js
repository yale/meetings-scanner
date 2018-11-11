// @flow
import React, { Component } from "react";
import Notification from "./notification";
import { StyleSheet, View } from "react-native";

type Props = {
  notifications: string[]
};

export default class Notifications extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        {this.props.notifications.map((notification, key) => (
          <Notification key={key} message={notification} />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end"
  }
});
