// @flow
import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

type Props = {
  message: string,
  showFor: number
};

type State = {
  visible: boolean
};

class Notifications extends Component<Props, State> {
  static defaultProps = {
    showFor: 2000
  };

  state = {
    visible: true
  };

  componentDidMount() {
    setTimeout(() => this.setState({ visible: false }), this.props.showFor);
  }

  render() {
    if (!this.state.visible) {
      return null;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.message}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex"
  },

  text: {
    color: "black",
    fontSize: 30
  }
});

export default Notifications;
