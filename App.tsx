

import React from 'react'
import { Text, View } from 'react-native'

import globalStyles from './styles/'

import Icon from "./components/Icon"

export default class App extends React.Component {
  render() {
    return (
      <View style={{backgroundColor: '#525A79', height: '100%'}}>
        <Text style={globalStyles.Text}>Step 3</Text>
        <Icon icon="home"/>
      </View>
    )
  }
}
