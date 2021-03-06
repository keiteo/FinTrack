import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Root } from "native-base";

import SplashScreen from "./src/pages/SplashScreen";
import LoginScreen from "./src/pages/LoginScreen";
import DrawerNavigator from "./src/navigation/DrawerNavigator";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { isLoading: true, isLoggedIn: true };
  }

  async performTimeConsumingTask() {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve("result");
      }, 1000)
    );
  }

  async componentDidMount() {
    // Preload data from an external API
    // Preload data using AsyncStorage(?)
    const data = await this.performTimeConsumingTask();

    if (data !== null) {
      this.setState({ isLoading: false });
    }
  }

  render() {
    if (this.state.isLoading) {
      return <SplashScreen />;
    }
    if (this.state.isLoggedIn) {
      // put a ! to access homescreen.
      return <LoginScreen />;
    }
    return (
      // home page
      <View style={styles.container}>
        <DrawerNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});

export default () => (
  <Root>
    <App />
  </Root>
);
