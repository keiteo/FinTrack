import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

import PageHeader from "../components/PageHeader";
import NavigationBar from "../navigation/NavigationBar";

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <PageHeader text="Home" navigation={this.props.navigation} />
        <NavigationBar />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  }
});
