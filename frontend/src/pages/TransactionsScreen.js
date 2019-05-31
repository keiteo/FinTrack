import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'

import PageHeader from '../components/PageHeader'
import NavigationBar from '../navigation/NavigationBar'

export default class TransactionsScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <PageHeader text="Transactions" navigation={this.props.navigation} />
        <NavigationBar />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
})